import { GeneralError } from '../classes/general-error';
import { HTTP_CODES } from '../constants/http-codes';
import { errorResponse } from '../services/error-response';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const errorHandler: ErrorRequestHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('entro al error por un trow')
    const { ValidationError } = Joi;
    console.error(
      `detailed information about the error in the service: `,
      error
    );
    const err: GeneralError = errorResponse(error);
    const response = err.buildResponse();
    let codeError = error instanceof ValidationError ? 400 : err.code;

    res.status(codeError).json(response);
  } catch (error) {
    res.status(HTTP_CODES.ServerError).json(error);
  }
};
