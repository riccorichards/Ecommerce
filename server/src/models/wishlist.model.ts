import mongoose from "mongoose";
import { WishlistDocument } from "../utils/types/types.wishlist";

const wishlist = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

const WishlishModel = mongoose.model<WishlistDocument>("Wishlist", wishlist);

export default WishlishModel;
