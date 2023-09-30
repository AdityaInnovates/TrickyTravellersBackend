import { Schema, model, Model, Types } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";

interface Tiers {
  gallery: string[];
  title: string;
  description: string;
  price: number;
  discount?: number;
}

export interface Event {
  gallery: string[];
  title: string;
  created_by: Types.ObjectId;
  approved_by?: Types.ObjectId;
  reject_reason?: string;
  updated_by: string;
  keywords: string[];
  slug: string;
  status: number;
  description: string;
  inclusions: string[];
  tiers: Tiers[];
  comments: Types.ObjectId;
}
interface EventModel extends Model<Event> {
  paginate: any;
}

const schema = new Schema<Event, EventModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    created_by: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    tiers: {
      type: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: Number, required: true },
          gallery: { type: [String], required: true, default: [] },
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

    gallery: {
      type: [String],
      required: true,
    },
    inclusions: { type: [String], required: true, default: [] },
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
const eventModel = model<Event, EventModel>("events", schema);
export default eventModel;
