import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import Hash from 'src/utils/hashing';
import { User } from 'src/entities/user.entity';
import { generateOTP, generateToken } from 'src/utils/token';
import { PasswordTokenService } from './password-token.service';
import * as moment from 'moment-timezone';
import RegisterDto from './dto/register.dto';
import { CustomersService } from '../customers/customers.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordTokenService: PasswordTokenService,
    private customerService: CustomersService,
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

  async loginByUser(user: any) {
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

  async register(body: RegisterDto): Promise<any> {
    body.status = 'inactive';

    //Kiểm tra email trùng lặp
    const existEmail = await this.usersService.existEmail(body.email);
    if (existEmail) {
      return {
        error: 'user-exist',
      };
    }
    //Xử lý đăng ký
    //1. Thêm user
    const user = await this.usersService.create(body, 'user');
    //2. Thêm customer
    await this.customerService.create({
      user,
      phone: body.phone,
    });
    return { tokens: await this.loginByUser(user), user };
  }

  async updateProfile({ name, email, phone, ...rest }: any, user: any) {
    if (user.user_type === 'admin') {
      //Xử lý update với user admin
      const userUpdate = { ...user, name, email };
      delete userUpdate.password;
      await this.usersService.update(userUpdate, user.id);
    } else {
      const userUpdate = { ...user, name, email };
      const customer = { ...user.customer };
      delete userUpdate.customer;
      delete userUpdate.password;
      const customerUpdate = {
        phone,
        ...rest,
      };

      await this.usersService.update(userUpdate, userUpdate.id);
      await this.customerService.update(customerUpdate, customer.id);
    }

    return this.usersService.find(user.id);
  }

  async checkOldPassword(oldPassword: string, user: any) {
    const passwordHash = user.password;
    if (!Hash.verify(oldPassword, passwordHash)) {
      return false;
    }
    return true;
  }

  async changePassword(password: string, userId: number) {
    return this.usersService.update({ password }, userId);
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
