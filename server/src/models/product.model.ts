import mongoose from "mongoose";
import { ProductDocument } from "../utils/types/types.product";

const product = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image: { type: String, default: null },
    price: { type: Number, required: true },
    discount: { type: Number, default: null },
    shopping: { type: String, default: null },
    subCategoryId: { type: mongoose.Types.ObjectId, ref: "Sub_category" },
  },
  { timestamps: true }
);

const ProductModal = mongoose.model<ProductDocument>("Product", product);

export default ProductModal;
