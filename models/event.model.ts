import { Schema, model, Model, Types } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";

interface Tiers {
  images: string[];
  title: string;
  description: string;
  price: number;
  discount?: number;
}

export interface Event {
  category_id: Types.ObjectId;
  images: string[];
  title: string;
  video: string;
  created_by: Types.ObjectId;
  approved_by?: Types.ObjectId;
  reject_reason?: string;
  updated_by: string;
  keywords: string[];
  slug: string;
  status: number;
  description: string;
  venue: string;
  tiers: Tiers[];
  date: Date;
  end_date: Date;
  comments: Types.ObjectId;
}
interface EventModel extends Model<Event> {
  paginate: any;
}

const schema = new Schema<Event, EventModel>(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    video: {
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
          images: { type: [String], required: true, default: [] },
          discount: {
            type: Number,
            required: false,
            default: 0,
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

    images: {
      type: [String],
      required: true,
    },
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
      required: false,
    },
  },
  { timestamps: true }
);

schema.plugin(paginate);
schema.plugin(toJSON);
const eventModel = model<Event, EventModel>("events", schema);
export default eventModel;
