import mongoose from "mongoose";
import { UserDocument } from "./types.customer";
import { ProductDocument } from "./types.product";

export interface WishlistInput {
  user: UserDocument["_id"];
  product: ProductDocument["_id"];
}

export interface WishlistDocument extends WishlistInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
