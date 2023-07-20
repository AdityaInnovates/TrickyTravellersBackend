import { User } from "./models/user.model";

declare namespace Express {
  export interface Request {
    user?: any;
  }
}
