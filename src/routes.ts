import { Router } from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/NodemailerMailAdapter";

import { PrismaFeedbacksRepository } from "./repositories/prisma/PrismaFeedbacksRepository";
import { SubmitFeedbackUseCase } from "./useCases/SubmitFeedbackUseCase";

export const routes = Router();

routes.post("/feedback", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    );

    await submitFeedbackUseCase.execute({ type, comment, screenshot });

    return res.status(201).send();
  } catch (err) {
    console.error(err);

    return res.status(500).send();
  }
});
