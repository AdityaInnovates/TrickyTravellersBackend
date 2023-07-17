import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import logger from "../config/logger";
export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? StatusCodes.BAD_REQUEST
      : StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || StatusCodes[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    stack: err.stack,
  };

  logger.error(err);

  res.status(statusCode).send(response);
};
