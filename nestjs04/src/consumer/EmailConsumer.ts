import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUE_NAME } from 'src/constants/queue';
import WelcomeEmail from 'src/mail/Welcome';

@Processor(QUEUE_NAME.EMAIL)
export class EmailConsumer extends WorkerHost {
  constructor(private welcomeEmail: WelcomeEmail) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    const data = job.data;
    console.log(data);
    try {
      const response = await this.welcomeEmail.send(data.email, data.subject, {
        company: data.company,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    return {};
  }
}
