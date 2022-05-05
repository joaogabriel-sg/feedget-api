import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,aofjaofjoajfojaofj",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled();
    expect(sendMailSpy).toBeCalled();
  });

  it("should NOT be able to submit a feedback without type", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,aofjaofjoajfojaofj",
      })
    ).rejects.toThrow();
  });

  it("should NOT be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,aofjaofjoajfojaofj",
      })
    ).rejects.toThrow();
  });

  it("should NOT be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "BUG",
        comment: "Tá tudo bugado!!!",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
