import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { constants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    //Decode từ jwt để trả về dữ liệu
    console.log(payload);

    return { userId: payload.sub, email: payload.email };
  }
}
