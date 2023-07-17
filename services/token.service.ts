import jwt from "jsonwebtoken";
import config from "../config/config";
export const generateToken = (user: any, expiry?: string) => {
  const token = jwt.sign({ id: user._id, role: user.role }, config.jwt.secret, {
    ...(expiry ? { expiresIn: expiry } : {}),
  });
  return token;
};
