import { Request, Response } from "express";
import log from "../utils/logger";
import {
  createMainCaterogy,
  deleteMainCategory,
  findSpecialMainCategory,
  getAllCategories,
  updateMainCategory,
} from "../services/mainCategory.services";
import {
  CreateMainCatType,
  DeleteMainCatType,
  ReadMainCatType,
  UpdateMainCatType,
} from "../schemas/mainCategory.schema";
import MainCategoryModal from "../models/mainCaterogy.model";

export const getAllMainCatHandler = async (req: Request, res: Response) => {
  try {
    const allMainCats = await getAllCategories();
    return res.status(200).json(allMainCats);
  } catch (error: any) {
    log.error("Error while fetching categories:", error.message);
    throw error;
  }
};

export const getSpecificMainCatHandler = async (
  req: Request<ReadMainCatType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;
    if (!_id)
      return res.status(404).json({ err: "Main category could not found" });

    const mainCat = await findSpecialMainCategory({ _id });

    return res.status(200).json(mainCat);
  } catch (error: any) {
    log.error("Error while fetching category:", error.message);
    throw error;
  }
};

export const createMainCatHandler = async (
  req: Request<{}, {}, CreateMainCatType["body"]>,
  res: Response
) => {
  try {
    const existingSubCat = Boolean(
      await MainCategoryModal.findOne({ title: req.body.title })
    );
    if (existingSubCat)
      return res
        .status(400)
        .json({ msg: "Main category is already existnig..." });

    const newMainCat = await createMainCaterogy(req.body);

    return res.status(201).json(newMainCat);
  } catch (error: any) {
    log.error("Error while creating category:", error.message);
    throw error;
  }
};

export const updateMainCatHandler = async (
  req: Request<UpdateMainCatType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(404).json({ err: "The main category could not found" });

    const updatedMainCat = await updateMainCategory({ _id }, req.body, {
      new: true,
    });

    return res.status(201).json(updatedMainCat);
  } catch (error: any) {
    log.error("Error while updating category:", error.message);
    throw error;
  }
};

export const deleteMainCatHandler = async (
  req: Request<DeleteMainCatType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(404).json({ err: "The main category could not found" });

    await deleteMainCategory({ _id });

    return res.status(200).json({ msg: "Succesfully Deleted..." });
  } catch (error: any) {
    log.error("Error while deleting category:", error.message);
    throw error;
  }
};
