import { Schema, Model, model, Types } from "mongoose";
import paginate from "./plugins/paginate";
import toJSON from "./plugins/toJSON";
interface Tickets {
  name: string;
  email: string;
  phone: string;
  tier: Types.ObjectId;
  user: Types.ObjectId;
  event: Types.ObjectId;
  persons: number;
}
interface TicketsModel extends Model<Tickets> {
  paginate: any;
}

const schema = new Schema<Tickets>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    tier: { type: Schema.Types.ObjectId, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    event: { type: Schema.Types.ObjectId, required: true, ref: "events" },
    persons: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

schema.plugin(paginate);
schema.plugin(toJSON);

const ticketsModel = model<Tickets, TicketsModel>("event-tickets", schema);
export default ticketsModel;
