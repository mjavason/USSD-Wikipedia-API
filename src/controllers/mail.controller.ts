import { mailService } from '../services';
import { APP_NAME, SITE_LINK } from '../constants';
import logger from '../helpers/logger';
const fs = require('fs');
const handlebars = require('handlebars');

async function renderMailTemplate(templatePath: string, data: object) {
  try {
    // Load the email template
    // const templatePath = './email-templates/welcome-email.html';
    const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

    // Compile the template
    const compiledTemplate = handlebars.compile(emailTemplate);
    return compiledTemplate(data);
  } catch (e) {
    logger.error('Error compiling template');
    console.log(e);
    return false;
  }
}
class Controller {
  async sendWelcomeMail(email: string, firstName: string, lastName: string, token: string) {
    // Load the email template
    const templatePath = 'src/templates/welcome.html';

    const confirmationLink = `${SITE_LINK}/auth/welcome/${token}`;

    // Replace placeholders with actual data
    const data = {
      firstName: firstName,
      lastName: lastName,
      confirmationLink: confirmationLink,
    };
    // Compile the template
    const compiledTemplate = await renderMailTemplate(templatePath, data);

    if (!compiledTemplate) return false;
    // Send the email
    const info = await mailService.sendMail(
      email,
      compiledTemplate,
      `${APP_NAME} #100DaysOfAPIAwesomeness Welcome`,
    );

    console.log(`#100DaysOfAPIAwesomeness Welcome email sent to: ${email}`);

    return { info };
  }
}

export const mailController = new Controller();
