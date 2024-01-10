import { GeneralError } from '../classes/general-error';
import { HTTP_CODES } from '../constants/http-codes';

import { ValidationError } from './validation';

/**
 * Create a GeneralError instance based on error type
 * @param error (Error instance) Error to use for response and log
 * @returns GeneralError object used to create error response
 */
export const errorResponse = (error): GeneralError => {
  let code: number;
  let message: string;

  if (error instanceof GeneralError) {
    return error;
  }

  if (error instanceof ValidationError) {
    code = HTTP_CODES.ServerError;
    message = 'Internal Server Error';
  }

  return new GeneralError(error, message, code);
};
