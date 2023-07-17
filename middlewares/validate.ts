import joi from "joi";
import { StatusCodes } from "http-status-codes";
import pick from "../utils/pick";
import ApiError from "../utils/ApiError";
import { NextFunction, Request, Response } from "express";
const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", "query", "body"]);

    const object = pick(req, Object.keys(validSchema));

    const { value, error } = joi
      .compile(validSchema)
      .prefs({ errors: { label: "key" } })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details: any) => details.message)
        .join(", ");
      return next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
