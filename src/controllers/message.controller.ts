import { Request, Response } from 'express';
import { UserRepository } from '../orm/repositories/UserRepository';

const createMessage = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const userRepository = new UserRepository();
    
    const userCreate = await userRepository.create({ name });

    res.status(200).send(userCreate);
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};



export { createMessage };