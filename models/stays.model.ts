import { Schema, model, Document, Model, Types } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";

export interface Tiers {
  name: string;
  description: string;
  amenities: string[];
  images: string[];
  price: number;
  discount?: string;
  other_details?: string;
}

interface Stays extends Document {
  address: string;
  body: string;
  user_id: Types.ObjectId;
  keywords: string[];
  slug: string;
  status: number;
  title: string;
  images: string[];
  tiers: Tiers[];
  facilities: any[];
  approved_by?: Types.ObjectId;
  reject_reason?: string;
  updated_by: string;
  comments: Types.ObjectId;
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
          images: { type: [String], required: true, default: [] },
          other_details: { type: String, required: false },
          discount: {
            type: String,
            required: false,
          },
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
    images: {
      type: [String],
      required: true,
    },
    facilities: { type: [String], required: true, default: [] },
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
      type: Schema.Types.ObjectId,
      required: true,
      ref: "comments",
    },
  },
  { timestamps: true }
);
schema.plugin(paginate);
schema.plugin(toJSON);

const staysModel = model<Stays, StaysModel>("stays", schema);

export default staysModel;
