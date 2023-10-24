import mongoose from "mongoose";
import { UserDocument } from "./types.customer";
import { ProductDocument } from "./types.product";

export interface OrderInput {
  user: UserDocument["_id"];
  product: ProductDocument["_id"];
}

export interface OrderDocument extends OrderInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
