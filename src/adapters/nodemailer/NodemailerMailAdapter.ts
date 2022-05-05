import nodemailer from "nodemailer";

import { IMailAdapter, ISendMailData } from "../MailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "93b6f31364213e",
    pass: "261016838047ef",
  },
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ subject, body }: ISendMailData): Promise<void> {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "João Gabriel <main.joaogabrielsg@gmail.com>",
      subject,
      html: body,
    });
  }
}
