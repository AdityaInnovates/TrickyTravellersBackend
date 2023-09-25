import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import session from "cookie-session";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import passport from "passport";
import jwtCallback from "./config/passport";
import ApiError from "./utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { errorConverter, errorHandler } from "./middlewares/error";
import * as morgan from "./config/morgan";
import mongoose from "mongoose";
import router from "./routes";
import paginate from "./models/plugins/paginate";
import toJSON from "./models/plugins/toJSON";
import GoogleStrategy from "./config/passport-google";

mongoose.plugin(paginate);
mongoose.plugin(toJSON);

const app: Application = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    name: "session",
    keys: ["tricky-travellers"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use(mongoSanitize());

app.use("/v1", router);

passport.use("google", GoogleStrategy);
passport.use("jwt", jwtCallback);

app.use((req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

export default app;
