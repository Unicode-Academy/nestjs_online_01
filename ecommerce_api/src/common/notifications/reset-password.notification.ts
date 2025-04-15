import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import Notification from '../mail/abstractions/notification';

@Injectable()
export default class ResetPasswordNotification extends Notification {
  constructor(protected readonly mailerService: MailerService) {
    super(mailerService);
  }

  subject(context: any): string {
    return `[Unicode] ${context.name} đặt lại mật khẩu thành công`;
  }
  template(): string {
    return 'reset-password';
  }
  send(data: any) {
    return this.sendMail(data.email, {
      name: data.name,
    });
  }
}
