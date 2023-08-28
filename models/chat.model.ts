import { Schema, model, Types } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";
export interface Messages {
  sender: Types.ObjectId;
  message: string;
}
export interface Chat extends Document {
  users: Types.ObjectId[];
  messages: Messages[];
}

const messageschema = new Schema<Messages>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "users" },
    message: { type: String },
  },
  { timestamps: true }
);

const schema = new Schema<Chat>(
  {
    users: { type: [Schema.Types.ObjectId], ref: "users", default: [] },
    messages: {
      type: [messageschema],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

messageschema.plugin(toJSON);
messageschema.plugin(paginate);

schema.plugin(toJSON);
schema.plugin(paginate);

const userModel = model<Chat>("chats", schema);
export default userModel;
