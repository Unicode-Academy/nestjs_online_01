import { Strategy } from 'passport-google-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      // clientID:
      //   '672062294064-0m77qi510hu4scqr4mqcg4bou024akb1.apps.googleusercontent.com',
      // clientSecret: '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',
      // callbackURL: 'http://localhost:3000/auth/google/callback',
      // scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    // console.log(`accessToken`, accessToken);
    // console.log(`refreshToken`, refreshToken);
    // console.log(`profile`, profile);
    // console.log(`done`, done);
    const user = this.authService.loginGoogle(profile);
    return user;
  }
}
