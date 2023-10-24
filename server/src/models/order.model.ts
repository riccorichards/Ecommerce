import mongoose from "mongoose";
import { OrderDocument } from "../utils/types/types.order";

const order = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<OrderDocument>("Order", order);

export default OrderModel;
