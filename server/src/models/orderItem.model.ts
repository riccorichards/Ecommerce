import mongoose from "mongoose";
import { OrderItemDocument } from "../utils/types/types.orderItem";

const orderItem = new mongoose.Schema(
  {
    order: { type: mongoose.Types.ObjectId, ref: "Order" },
    totalPrice: { type: Number, required: true },
    productQty: { type: Number, required: true },
  },
  { timestamps: true }
);

const OrderItemModel = mongoose.model<OrderItemDocument>(
  "Order_item",
  orderItem
);

export default OrderItemModel;
