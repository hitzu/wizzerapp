import { Request, Response } from 'express';
import { ConversationRepository } from '../orm/repositories/ConversationRepository';
import { ConversationUserRepository } from '../orm/repositories/ConversationUserRepository';

const conversationRepository = new ConversationRepository();
const conversationUserRepository = new ConversationUserRepository();

const createConversation = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const conversationCreated = await conversationRepository.create({createdAt: new Date()});
    await conversationUserRepository.create({ userId, conversationId: conversationCreated.id });

    res.status(201).send();
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

const joinUserConversation = async (req: Request, res: Response) => {
  try {
    const { conversationId, userId } = req.body;
    await conversationUserRepository.create({ userId, conversationId });

    res.status(201).send();
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

const deleteConversation = async (req: Request, res: Response) => {
  try {

    const { id } = req.body;
    await conversationRepository.softDelete(id);

    res.status(201).send();
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

export { createConversation, joinUserConversation, deleteConversation };