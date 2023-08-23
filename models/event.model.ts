import { Schema, model, Model, Types } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";
export interface Event {
  body: string;
  date: Date;
  keywords: [string];
  location_id: string;
  image: string;
  category_id: Types.ObjectId;
  price: number;
  slug: string;
  status: number;
  title: string;
  created_by: Types.ObjectId;
  venue: string;
  video?: string;
  approved_by?: Types.ObjectId;
  reject_reason?: string;
}

interface EventModel extends Model<Event> {
  paginate: any;
}

const schema = new Schema<Event>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String, required: true },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
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
    venue: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: false,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    location_id: {
      type: String,
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
  },
  { timestamps: true }
);
schema.plugin(paginate);
schema.plugin(toJSON);
const eventModel = model<Event, EventModel>("events", schema);
export default eventModel;
