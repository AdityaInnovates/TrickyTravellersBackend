import passport from "passport";
import { Strategy } from "passport-google-oauth2";
import config from "./config";

const GoogleStrategy = new Strategy(
  {
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: "https://trickytravellers.in/api/v1/auth/google/callback",
    passReqToCallback: true,
    scope: ["profile", "email"],
  },
  (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
    req.logIn(profile, (error: any) => console.log(error));
    req.user = profile;

    done(null, profile);
  }
);

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  console.log("deserializing");
  done(null, user);
});
export default GoogleStrategy;
