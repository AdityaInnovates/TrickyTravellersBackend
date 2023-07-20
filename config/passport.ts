import config from "./config";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../models";
const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const verifyJwt = async (payload: any, done: any) => {
  try {
      const user = await User.findById(payload.id);
    if (!user) {
      done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwt = new Strategy(jwtOptions, verifyJwt);

export default jwt;
