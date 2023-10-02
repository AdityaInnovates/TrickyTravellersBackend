import { Schema, model, Model, Types } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";

export interface Blog {
  title: string;
  category_id: Types.ObjectId;
  keywords: string[];
  visit_count?: number;
  content: Types.ObjectId;
  created_by: Types.ObjectId;
  // extra_image: string;
  approved_by?: Types.ObjectId;
  status: number;
  featured: string;
  slug?: string;
  reject_reason?: string;
  updated_by: string;
  likes: Types.ObjectId[];
  comments: Types.ObjectId;
}

interface BlogModel extends Model<Blog> {
  paginate: any;
}

const schema = new Schema<Blog>(
  {
    title: { type: String, required: true },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    content: {
      type: Schema.Types.ObjectId,
      ref: "post-contents",
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
      default: [],
    },
    featured: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: false,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    approved_by: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    visit_count: { type: Number, required: true, default: 0 },
    // extra_image: {
    //   type: String,
    //   required: true,
    // },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    reject_reason: {
      type: String,
      required: false,
    },
    updated_by: {
      type: String,
      required: true,
    },

    likes: { type: [Schema.Types.ObjectId], ref: "users", default: [] },
    comments: { type: Schema.Types.ObjectId, required: false },
  },
  { timestamps: true }
);
schema.plugin(paginate);
schema.plugin(toJSON);
const blogModel = model<Blog, BlogModel>("posts", schema);
export default blogModel;
