import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { comparePassword } from 'src/utils/hashing';
import * as md5 from 'md5';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import {
  ISendMailOptions,
  MailerOptions,
  MailerService,
} from '@nestjs-modules/mailer';
import * as path from 'path';
import { SettingsService } from '../settings/settings.service';
import WelcomeEmail from 'src/mail/Welcome';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AuthService {
  private userAgent: string = null;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
    private readonly mailService: MailerService,
    private readonly settingService: SettingsService,
    private readonly welcomeEmail: WelcomeEmail,
    @InjectQueue('email') private emailQueue: Queue,
  ) {}
  async checkAuth(email: string, password: string, userAgent: string) {
    this.userAgent = md5(userAgent);
    //Kiểm tra email có tồn tại hay không?
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      const passwordHash = user.password;
      if (comparePassword(password, passwordHash)) {
        const token = await this.getToken(user);
        await this.saveTokenToRedis(token);
        return token;
      }
    }
    return false;
  }

  async refreshToken(refreshToken: string) {
    const payload = this.decodeToken(refreshToken);
    if (!payload) {
      return false;
    }
    //Kiểm tra refresh token có ở trên redis không?
    const hashRefreshToken = md5(refreshToken);
    const tokenFromRedis = await this.redis.get(
      `refresh_token_${hashRefreshToken}`,
    );
    if (!tokenFromRedis) {
      return false;
    }
    //Xóa refresh token trên redis
    this.revokeRefreshToken(refreshToken);
    //Thêm access token vào blacklist
    const accessToken = JSON.parse(tokenFromRedis).access_token;
    await this.redis.set(`blacklist_${accessToken}`, accessToken);
    return this.getToken({ id: payload.sub } as User);
  }

  async revokeRefreshToken(refreshToken: string) {
    const hashRefreshToken = md5(refreshToken);
    await this.redis.del(`refresh_token_${hashRefreshToken}`);
    return true;
  }

  async logout(accessToken: string, exp: number) {
    const hashAccessToken = md5(accessToken);

    const currentTime = new Date().getTime() / 1000;
    const expire = Math.round(exp - currentTime);

    await this.redis.set(
      `blacklist_${hashAccessToken}`,
      hashAccessToken,
      'EX',
      expire,
    );
  }

  async getToken(user: User) {
    return {
      access_token: await this.createToken(user),
      refresh_token: await this.createRefreshToken(user),
    };
  }

  async getUser(token: string, userAgent: string) {
    const payload = this.decodeToken(token);
    if (!payload || md5(userAgent) !== payload.userAgent) return false;

    const tokenFromRedis = await this.redis.get(`blacklist_${md5(token)}`);
    if (tokenFromRedis) return false;
    return this.userRepository.findOne({ where: { id: payload.sub } });
  }

  createToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      userAgent: this.userAgent,
    };
    return this.jwtService.signAsync(payload);
  }

  async createRefreshToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRED,
    });
    //Lưu vào redis
    // refresh_token_{hashRefresh} = hashRefresh
    const hashRefreshToken = md5(refreshToken);
    const currentTime = new Date().getTime() / 1000;
    const decoded = this.decodeToken(refreshToken);
    const expireTime = decoded.exp;
    const diff = Math.round(expireTime - currentTime);
    await this.redis.set(
      `refresh_token_${hashRefreshToken}`,
      hashRefreshToken,
      'EX',
      diff,
    );
    return refreshToken;
  }

  async saveTokenToRedis(token: {
    access_token: string;
    refresh_token: string;
  }) {
    const hashRefreshToken = md5(token.refresh_token);
    const hashAccessToken = md5(token.access_token);
    const currentTime = new Date().getTime() / 1000;
    const decoded = this.decodeToken(token.refresh_token);
    const expireTime = decoded.exp;
    const diff = Math.round(expireTime - currentTime);
    await this.redis.set(
      `refresh_token_${hashRefreshToken}`,
      JSON.stringify({
        access_token: hashAccessToken,
        refresh_token: hashRefreshToken,
      }),
      'EX',
      diff,
    );
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  async getGoogleUser(accessToken: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          method: 'GET',
        },
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async loginGoogle(
    googleUser: { name: string; email: string },
    userAgent: string,
  ) {
    this.userAgent = md5(userAgent);
    let user = await this.userRepository.findOne({
      where: { email: googleUser.email },
    });
    if (!user) {
      const userData = this.userRepository.create({
        fullname: googleUser.name,
        email: googleUser.email,
        status: true,
        verify_at: new Date(),
      });
      user = await this.userRepository.save(userData);
    }
    return this.getToken(user);
  }

  async register() {
    let templateContent = '';
    const template = await this.settingService.getOption(
      'register_email_template',
    );
    if (template) {
      templateContent = template;
    }
    const user = await this.userRepository.findOne({
      where: { fullname: 'admin' },
    });
    // const fullname = 'Hoàng An Unicode';
    // const active_link = 'https://google.com';
    // const data = { fullname, active_link };
    (user as User & { active_link: string }).active_link = 'https://google.com';
    templateContent = templateContent.replace(
      /{(.+?)}/g,
      function (match, key) {
        return user[key];
      },
    );
    const options: ISendMailOptions = {
      to: 'contact@unicode.vn',
      subject: 'Testing Nest MailerModule ✔', // Subject line
    };
    if (templateContent) {
      options.html = templateContent;
    } else {
      options.template = 'register';
      options.context = {
        fullname: user.fullname,
        active_link: 'https://google.com',
      };
    }
    await this.emailQueue.add('send-email', {
      email: 'contact@unicode.vn',
      subject: 'Welcome to Unicode',
      company: 'Unicode',
    });
    await this.emailQueue.add('send-email', {
      email: 'contact@unicode.vn',
      subject: 'Welcome to Unicode 2',
      company: 'Unicode 2',
    });
    // console.log(job);
    // const response = await this.mailService.sendMail(options);
    // await this.welcomeEmail.send('contact@unicode.vn', 'Welcome to Unicode', {
    //   company: 'Unicode',
    // });
    // return response;
  }
}
