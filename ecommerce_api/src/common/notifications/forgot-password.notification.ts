import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import Notification from '../mail/abstractions/notification';

@Injectable()
export default class ForgotPasswordNotification extends Notification {
  constructor(protected readonly mailerService: MailerService) {
    super(mailerService);
  }

  subject(context: any): string {
    return `[Unicode] ${context.name} Đặt lại mật khẩu cho tài khoản của bạn`;
  }
  template(): string {
    return 'forgot-password';
  }
  send(data: any) {
    return this.sendMail(data.email, {
      name: data.name,
      otp: data.token,
      expired: data.expire_at,
    });
  }
}
