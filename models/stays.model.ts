import { Schema, model, Document, Model, Types } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";
export interface Comment {
  user_id: Types.ObjectId;
  comment: string;
  replies: Comment[];
}
export interface Tiers {
  name: string;
  description: string;
  amenities: string[];
  gallery: string[];
  price: number;
  other_details: string;
}

interface Stays extends Document {
  address: string;
  body: string;
  discount?: string;
  user_id: Types.ObjectId;
  keywords: string[];
  slug: string;
  status: number;
  title: string;
  image: string;
  tiers: Tiers[];
  facilities: any[];
  approved_by?: Types.ObjectId;
  reject_reason?: string;
  updated_by: string;
  comments: Comment[];
}
const comment = new Schema<Comment>({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  comment: { type: String, required: true },
  replies: {
    type: [
      {
        user_id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
        comment: { type: String, required: true },
      },
    ],
    required: true,
    default: [],
  },
});
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
    tiers: {
      type: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          amenities: { type: [String], required: true, default: [] },
          price: { type: Number, required: true },
          gallery: { type: [String], required: true, default: [] },
          other_details: { type: String, required: true },
        },
      ],
    },
    keywords: {
      type: [String],
      required: true,
      default: [],
    },

    slug: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
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
    updated_by: {
      type: String,
      required: true,
    },
    comments: {
      type: [comment],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);
schema.plugin(paginate);
schema.plugin(toJSON);

const staysModel = model<Stays, StaysModel>("stays", schema);

export default staysModel;
