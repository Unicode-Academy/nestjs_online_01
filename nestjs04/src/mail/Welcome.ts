import { MailerService } from '@nestjs-modules/mailer';
import { Inject } from '@nestjs/common';

export default class WelcomeEmail {
  constructor(
    @Inject(MailerService)
    private readonly mailService: MailerService,
  ) {}
  send(to: string, subject: string, data = {}) {
    return this.mailService.sendMail({
      to,
      subject,
      template: 'welcome',
      context: data,
    });
  }
}
