import { Schema, model, Document, Model } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";

export interface Category extends Document {
  name: string;
  type: string;
}
interface CategoryModel extends Model<Category> {
  paginate: any;
}
const schema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["event", "blog", "stay"],
    },
  },
  { timestamps: true }
);

schema.plugin(paginate);
schema.plugin(toJSON);

const categoryModel = model<Category, CategoryModel>("categories", schema);
export default categoryModel;
