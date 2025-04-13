import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import Hash from 'src/utils/hashing';
import { User } from 'src/entities/user.entity';
import { generateOTP, generateToken } from 'src/utils/token';
import { PasswordTokenService } from './password-token.service';
import * as moment from 'moment-timezone';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordTokenService: PasswordTokenService,
  ) {}

  async login(email: string, password: string) {
    //Lấy user theo email
    const user = await this.usersService.find(email, 'email');
    if (!user) {
      return null;
    }

    const passwordHash = user.password;
    if (!Hash.verify(password, passwordHash)) {
      return null;
    }

    return this.createToken(user);
  }

  async verfifyToken(token: string) {
    //verify token
    const decoded = this.decodedToken(token);
    if (decoded) {
      //Lấy user
      const user: User = await this.usersService.find(decoded.id);
      if (user && user.status === 'active') {
        return user;
      }
    }

    return false;
  }

  async refreshToken(refreshToken: string) {
    //Kiểm tra refresh token có hợp lệ không?
    const decoded = this.decodedToken(refreshToken);
    if (decoded) {
      return this.createToken(decoded);
    }
    return false;
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.find(email, 'email');
    if (user) {
      //Khởi tạo password token
      const token = generateOTP();

      const expireOption = process.env
        .PASSWORD_TOKEN_EXPIRED as unknown as number;
      const expiredTimestamp = Date.now() + expireOption * 1000;
      const expired = moment(expiredTimestamp).format('YYYY-MM-DD HH:mm:ss');

      const passwordToken = await this.passwordTokenService.create({
        token,
        expire_at: expired,
        user,
      });

      return passwordToken;
    }
    return false;
  }

  private decodedToken(token: string) {
    return this.jwtService.decode(token);
  }

  private createToken(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
    };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRED,
    });
    //Lấy thời gian sống của accessToken
    const accessTokenDecoded = this.decodedToken(accessToken);
    const accessTokenExpires = accessTokenDecoded.exp;

    //Lấy thời gian sống của refreshToken
    const refreshTokenDecoded = this.decodedToken(refreshToken);
    const refreshTokenExpires = refreshTokenDecoded.exp;

    return {
      accessToken,
      refreshToken,
      accessTokenExpires,
      refreshTokenExpires,
    };
  }
}
