import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
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

mongoose.plugin(paginate);
mongoose.plugin(toJSON);

const app: Application = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(helmet());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use(mongoSanitize());

app.use("/v1", router);

app.use((req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, "Not found"));
});

app.use(passport.initialize());
passport.use("jwt", jwtCallback);

app.use(errorConverter);
app.use(errorHandler);

export default app;
