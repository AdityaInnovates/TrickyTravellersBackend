import { Schema, model, Document, Model } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";

export interface Destination extends Document {
  image: string;
  name: string;
}
interface DestinationModel extends Model<Destination> {
  paginate: any;
}
const schema = new Schema<Destination>(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.plugin(paginate);
schema.plugin(toJSON);

const destinationModel = model<Destination, DestinationModel>(
  "destinations",
  schema
);
export default destinationModel;
