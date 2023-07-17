import { Schema, model } from "mongoose";
import crypto from "crypto";

export interface User {
  name: string;
  password: string;
  email: string;
  role?: string;
  active: boolean;
  ban: boolean;
  google_id?: string;
  remember_token?: string;
  profile_photo_path?: string;
}

const schema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    ban: {
      type: Boolean,
      required: true,
      default: false,
    },
    profile_photo_path: {
      type: String,
      required: false,
    },
    remember_token: {
      type: String,
      required: false,
    },
    google_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.statics.isEmailTaken = async function (email: string) {
  const user = await this.findOne({ email });
  return !!user;
};

schema.methods.isPasswordMatch = async function (password: string) {
  const user = this;
  const hash = crypto.createHash("sha256").update(password).digest("base64");
  return hash === user.password;
};

schema.pre("save", async function (next: any) {
  const user = this;
  if (user.isModified("password")) {
    user.password = crypto
      .createHash("sha256")
      .update(user.password)
      .digest("base64");
  }
  next();
});

const userModel = model<User>("users", schema);
export default userModel;
