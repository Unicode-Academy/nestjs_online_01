import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { comparePassword } from 'src/utils/hashing';
import * as md5 from 'md5';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async checkAuth(email: string, password: string) {
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

  async getUser(token: string) {
    const payload = this.decodeToken(token);
    if (!payload) return false;
    const tokenFromRedis = await this.redis.get(`blacklist_${md5(token)}`);
    if (tokenFromRedis) return false;
    return this.userRepository.findOne({ where: { id: payload.sub } });
  }

  createToken(user: User) {
    const payload = { sub: user.id, email: user.email };
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
}
