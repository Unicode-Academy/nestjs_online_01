import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import * as path from 'path';
dotenvConfig();
const config = {
  transport: `${process.env.MAIL_PORT === '465' ? 'smtps' : 'smtp'}://${process.env.MAIL_USERNAME}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}`,
  defaults: {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM}>`,
  },
  template: {
    dir: path.join(__dirname, '../templates'),
    adapter: new EjsAdapter(),
    options: {
      strict: true,
    },
  },
};

export default registerAs('mail', () => config);
