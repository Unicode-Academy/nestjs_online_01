import { MailerService } from '@nestjs-modules/mailer';

export default abstract class Notification {
  constructor(protected readonly mailerService: MailerService) {}
  abstract subject(context: any): string; //Định nghĩa subject của notification

  abstract template(): string; //Khai báo tên template của notification

  abstract send(data: any): Promise<any>;

  protected sendMail(to: string, context: any = {}) {
    return this.mailerService.sendMail({
      to,
      subject: this.subject(context),
      template: this.template(),
      context,
    });
  }
}
