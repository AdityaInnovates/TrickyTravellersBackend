import { Schema, Types, model } from "mongoose";
import toJSON from "./plugins/toJSON";

const schema = new Schema({
  comments: {
    type: [
      {
        user_id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
        comment: { type: String, required: true },
        rating: {
          type: Number,
          max: 5,
          required: false,
        },
        replies: {
          type: [
            {
              user_id: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "users",
              },
              comment: { type: String, required: true },
            },
          ],
          required: true,
          default: [],
        },
      },
    ],
    required: true,
    default: [],
  },
});

schema.plugin(toJSON);

const commentModel = model("comments", schema);

export default commentModel;
