export interface IFeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface IFeedbacksRepository {
  create: (data: IFeedbackCreateData) => Promise<void>;
}
