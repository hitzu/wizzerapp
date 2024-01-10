import { Request, Response } from 'express';
import { UserRepository } from '../orm/repositories/UserRepository';
import { GeneralError } from '../classes/general-error';

const userRepository = new UserRepository();

const createUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;    
    const userCreate = await userRepository.create({ name });

    res.status(200).send(userCreate);
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    
    const usersFound = await userRepository.find();

    res.status(200).send(usersFound);
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userFound = await userRepository.findOne({ where: {id} });

    if (!userFound) {
      throw new GeneralError(new Error, 'message not found', 404);
    }
    res.status(200).send(userFound);
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id, name } = req.body;
    await userRepository.update(id, { name });

    res.status(204).send();
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id} = req.body;
    await userRepository.softDelete(id);

    res.status(204).send();
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };