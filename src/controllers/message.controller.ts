import { Request, Response } from 'express';
import { MessageRepository } from '../orm/repositories/MessageRepository';
import { ConversationUserRepository } from '../orm/repositories/ConversationUserRepository';
import { GeneralError } from '../classes/general-error';

const messageRepository = new MessageRepository();
const conversationUserRepository = new ConversationUserRepository();

const createMessage = async (req: Request, res: Response) => {
  try {

    const { content, type, multimediaUrl, userId, conversationId } = req.body;

    const userInConversation = await conversationUserRepository.findOne({ where:{ userId, conversationId } })

    if (!userInConversation) { 
      throw new GeneralError(new Error, 'The user is unable to send messages in this conversation', 403);
    }

    const multimediaType = ['audio', 'image', 'video'];

    const messageCreated = await messageRepository.create({ 
      content,
      type,
      ...(multimediaType.includes(type) && {multimediaUrl}),
      userId,
      conversationId
     });

    res.status(200).send(messageCreated);
  } catch (error) {
    res.status(error?.code ?? 500).send(error);
  }
};

const getAllMessages = async (req: Request, res: Response) => {
  try {
    
    const { userId, conversationId, limit, page } = req.query;
    
    const qb = await messageRepository.queryBuilder();
    
    if (userId) {
      qb.select().where('user_id = :userId', {userId})
    }

    if (conversationId) {
      qb.select().where('conversationId = :conversationId', {conversationId})
    }
    
    qb.select().limit(Number(limit)).offset(Number(+limit * +page));
    
    const [response, total] = await qb.select().getManyAndCount();


    res.status(200).send({items: response, pages: total / +limit});
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

const getMessageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const messageFound = await messageRepository.findOne({ where: {id} });

    if (!messageFound) {
      throw new GeneralError(new Error, 'message not found', 404);
    }
    
    res.status(200).send(messageFound);
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

const updateMessage = async (req: Request, res: Response) => {
  try {
    const { id, content, type, multimediaUrl } = req.body;
    await messageRepository.update(id, { 
      ...(content && {content}),
      ...(type && {type}),
      ...(multimediaUrl && {multimediaUrl}), 
    });

    res.status(204).send();
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await messageRepository.softDelete(id);

    res.status(204).send();
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};



export { createMessage, getAllMessages, updateMessage, deleteMessage, getMessageById };