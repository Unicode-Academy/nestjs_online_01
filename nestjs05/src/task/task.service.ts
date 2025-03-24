import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  // @Cron('0 * * * * *')
  // sendEmailBirthday() {
  //   console.log('sendEmailBirthday');
  // }
}
