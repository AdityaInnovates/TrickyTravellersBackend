import { Schema, model, Document, Model, Types } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";

export interface Notification extends Document {
  user: Types.ObjectId;
  notification: string;
  title: string;
}
interface NotificationModel extends Model<Notification> {
  paginate: any;
}
const schema = new Schema<Notification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    notification: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
schema.plugin(toJSON);
schema.plugin(paginate);

const notificationsModel = model<Notification, NotificationModel>(
  "notifications",
  schema
);
export default notificationsModel;
