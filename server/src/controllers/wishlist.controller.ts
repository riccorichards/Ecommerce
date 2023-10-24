import { DeleteProductType } from "../schemas/product.schema";
import {
  CreateWishlistType,
  ReadWishlistType,
  UpdateWishlistType,
} from "../schemas/wishlist.schema";
import {
  createWishlist,
  deleteWishlist,
  getAllWishlists,
  getSpecificWishlist,
  updateWishlist,
} from "../services/wishlist.services";
import log from "../utils/logger";
import { Request, Response } from "express";

export const createWishlistHandler = async (
  req: Request<{}, {}, CreateWishlistType["body"]>,
  res: Response
) => {
  try {
    const newWishlist = await createWishlist(req.body);

    return res.status(201).json(newWishlist);
  } catch (error: any) {
    log.error("Error while creating wishlist:", error.message);
    throw error;
  }
};

export const getAllWishlistsHandler = async (req: Request, res: Response) => {
  try {
    const wishlists = await getAllWishlists();

    return res.status(200).json(wishlists);
  } catch (error: any) {
    log.error("Error while fetching all wishlists:", error.message);
    throw error;
  }
};

export const getWishlistHandler = async (
  req: Request<ReadWishlistType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(400).json({ err: "Could not found the wishlist..." });

    const wishlist = await getSpecificWishlist({ _id });

    return res.status(200).json(wishlist);
  } catch (error: any) {
    log.error("Error while fetching wishlist:", error.message);
    throw error;
  }
};

export const updateWishlistHandler = async (
  req: Request<UpdateWishlistType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(404).json({ err: "Could not found the wishlist..." });

    const updatedWishlist = await updateWishlist({ _id }, req.body, {
      new: true,
    });

    return res.status(200).json(updatedWishlist);
  } catch (error: any) {
    log.error("Error while update wishlist:", error.message);
    throw error;
  }
};

export const deleteWishlistHandler = async (
  req: Request<DeleteProductType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(404).json({ err: "Could not found the wishlist..." });

    await deleteWishlist({ _id });

    return res.status(200).json({ msg: "Succesfully deleted..." });
  } catch (error: any) {
    log.error("Error while deleting wishlist:", error.message);
    throw error;
  }
};
