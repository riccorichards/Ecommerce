import {
  CreateReviewType,
  DeleteReviewType,
  ReadReviewType,
  UpdateReviewType,
} from "../schemas/productReview.schema";
import {
  createProductReview,
  deleteProductReview,
  getAllProductReviews,
  getSpecificProductReview,
  updateProductReview,
} from "../services/productReview.services";
import log from "../utils/logger";
import { Request, Response } from "express";

export const createProductReviewHandler = async (
  req: Request<{}, {}, CreateReviewType["body"]>,
  res: Response
) => {
  try {
    const newProductReview = await createProductReview(req.body);

    return res.status(201).json(newProductReview);
  } catch (error: any) {
    log.error("Error while creating product review:", error.message);
    throw error;
  }
};

export const getAllProductReviewsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const productReviews = await getAllProductReviews();

    return res.status(200).json(productReviews);
  } catch (error: any) {
    log.error("Error while fetching all product reviews:", error.message);
    throw error;
  }
};

export const getProductReviewHandler = async (
  req: Request<ReadReviewType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(400).json({ err: "Could not found the product..." });

    const productReview = await getSpecificProductReview({ _id });

    return res.status(200).json(productReview);
  } catch (error: any) {
    log.error("Error while fetching product review:", error.message);
    throw error;
  }
};

export const updateProducReviewtHandler = async (
  req: Request<UpdateReviewType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res
        .status(404)
        .json({ err: "Could not found the product review..." });

    const updatedProductReview = await updateProductReview({ _id }, req.body, {
      new: true,
    });

    return res.status(200).json(updatedProductReview);
  } catch (error: any) {
    log.error("Error while update product:", error.message);
    throw error;
  }
};

export const deleteProductReviewHandler = async (
  req: Request<DeleteReviewType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res
        .status(404)
        .json({ err: "Could not found the product review..." });

    await deleteProductReview({ _id });

    return res.status(200).json({ msg: "Succesfully deleted..." });
  } catch (error: any) {
    log.error("Error while deleting product review:", error.message);
    throw error;
  }
};
