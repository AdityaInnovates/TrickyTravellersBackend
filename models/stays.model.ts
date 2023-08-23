import { Schema, model, Document, Model, Types } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";

interface Stays extends Document {
  address: string;
  body: string;
  discount?: string;
  user_id: Types.ObjectId;
  keywords: [string];
  price: number;
  slug: string;
  status: number;
  title: string;
  image: string;
  facilities: [any];
  approved_by?: Types.ObjectId;
  reject_reason?: string;
}

interface StaysModel extends Model<Stays> {
  paginate: any;
}

const schema = new Schema<Stays>(
  {
    address: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: false,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    facilities: { type: [], required: true, default: [] },
    approved_by: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    reject_reason: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
schema.plugin(paginate);
schema.plugin(toJSON);

const staysModel = model<Stays, StaysModel>("stays", schema);

export default staysModel;
