import { Schema, model, Document, Model, Types } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";

export interface Content extends Document {
  content: string;
  blog_id: Types.ObjectId;
}
interface ContentModel extends Model<Content> {
  paginate: any;
}
const schema = new Schema<Content>(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.plugin(paginate);
schema.plugin(toJSON);

const categoryModel = model<Content, ContentModel>("post-contents", schema);
export default categoryModel;
