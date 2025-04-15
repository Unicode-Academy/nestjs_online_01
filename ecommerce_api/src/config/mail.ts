export const transport = `smtps://${process.env.MAIL_USERNAME}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}`;

export const defaultOptions = {
  from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM}>`,
};
