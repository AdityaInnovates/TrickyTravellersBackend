import passport from "passport";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import { rights } from "../config/roles";
import { NextFunction, Request, Response } from "express";
const verifyCallback = (
  req: any,
  resolve: any,
  reject: any,
  requiredRights: any
) => {
  return async (err: any, user: any, info: any) => {
    if (err || info || !user) {
      return reject(
        new ApiError(StatusCodes.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = rights.get(user.role);
      const hasRequiredRights = requiredRights.every((requiredRight: string) =>
        userRights.includes(requiredRight)
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(StatusCodes.FORBIDDEN, "Forbidden"));
      }
      if (!user.active && req.route.path !== "/verify") {
        return reject(
          new ApiError(StatusCodes.FORBIDDEN, "Account not activated yet!")
        );
      }
    }

    resolve();
  };
};

const auth =
  (...requiredRights: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
