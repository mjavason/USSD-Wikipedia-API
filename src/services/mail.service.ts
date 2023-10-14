import nodeMailer from 'nodemailer';
import { MAIL_ADDRESS, MAIL_PASSWORD, SITE_LINK } from '../constants';
import { SuccessMsgResponse } from '../helpers/response';

// Email account setup and login. You need to pass in your email credentials and use this app to control it.
const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: MAIL_ADDRESS,
    pass: MAIL_PASSWORD,
  },
});

class Service {
  sendMail = async (recipientEmail: string, mailHtmlBody: string, mailSubject: string) => {
    // This is where the actual email message is built. Things like CC, recipients, attachments, and so on are configured here.
    return await transporter.sendMail({
      from: `#1OODaysOfAPIAwesomeness <${MAIL_ADDRESS}>`,
      to: recipientEmail,
      subject: mailSubject,
      html: mailHtmlBody,
    });
  };
}

export const mailService = new Service();
