import mongoose from "mongoose";

import { ProductReviewDocument } from "../utils/types/types.productReview";

const productReview = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
    review: { type: String, default: null },
    rating: { type: Number, default: null },
  },
  { timestamps: true }
);

const ProductReviewModal = mongoose.model<ProductReviewDocument>(
  "Product_review",
  productReview
);

export default ProductReviewModal;
