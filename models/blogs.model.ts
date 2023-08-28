import { Schema, model, Model, Types } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";

export interface Comment {
  user_id: Types.ObjectId;
  comment: string;
}

export interface Blog {
  title: string;
  content: string;
  category_id: Types.ObjectId;
  keywords: [string];
  visit_count?: number;
  created_by: Types.ObjectId;
  // extra_image: string;
  approved_by?: Types.ObjectId;
  status: number;
  featured: string;
  slug?: string;
  reject_reason?: string;
  updated_by: string;
  comments: [Comment];
}

interface BlogModel extends Model<Blog> {
  paginate: any;
}

const comment = new Schema<Comment>({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  comment: { type: String, required: true },
});

const schema = new Schema<Blog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
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
const blogModel = model<Blog, BlogModel>("posts", schema);
export default blogModel;
