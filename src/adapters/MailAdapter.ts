export interface ISendMailData {
  subject: string;
  body: string;
}

export interface IMailAdapter {
  sendMail: (data: ISendMailData) => Promise<void>;
}
