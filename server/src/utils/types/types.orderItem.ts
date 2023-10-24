import mongoose from "mongoose";
import { OrderDocument } from "./types.order";

export interface OrderItemInput {
  order: OrderDocument["_id"];
  totalPrice: number;
  productQty: number;
}

export interface OrderItemDocument extends OrderItemInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
