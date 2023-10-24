import { Request, Response } from "express";
import log from "../utils/logger";
import {
  createSubCaterogy,
  deleteSubCategory,
  findSpecialSubCategory,
  getAllSubCat,
  updateSubCategory,
} from "../services/subCategory.services";
import {
  CreateSubCatType,
  DeleteSubCatType,
  ReadSubCatType,
  UpdateSubCatType,
} from "../schemas/subCategory.schema";
import SubCategoryModal from "../models/subCaterogy.model";

export const getAllSubCatsHandler = async (req: Request, res: Response) => {
  try {
    const allSubCats = await getAllSubCat();
    return res.status(200).json(allSubCats);
  } catch (error: any) {
    log.error("Error while fetching categories:", error.message);
    throw error;
  }
};

export const getSpecificSubCatHandler = async (
  req: Request<ReadSubCatType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;
    if (!_id)
      return res.status(404).json({ err: "Sub category could not found" });

    const subCat = await findSpecialSubCategory({ _id });

    return res.status(200).json(subCat);
  } catch (error: any) {
    log.error("Error while fetching sub category:", error.message);
    throw error;
  }
};

export const createSubCatHandler = async (
  req: Request<{}, {}, CreateSubCatType["body"]>,
  res: Response
) => {
  try {
    const existingSubCat = Boolean(
      await SubCategoryModal.findOne({ title: req.body.title })
    );
    if (existingSubCat)
      return res
        .status(400)
        .json({ msg: "Sub category is already existnig..." });
    const newMainCat = await createSubCaterogy(req.body);

    return res.status(201).json(newMainCat);
  } catch (error: any) {
    log.error("Error while creating sub category:", error.message);
    throw error;
  }
};

export const updateSubCatHandler = async (
  req: Request<UpdateSubCatType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(404).json({ err: "Sub category could not found" });

    const updatedSubCat = await updateSubCategory({ _id }, req.body, {
      new: true,
    });

    return res.status(201).json(updatedSubCat);
  } catch (error: any) {
    log.error("Error while updating sub category:", error.message);
    throw error;
  }
};

export const deleteSubCatHandler = async (
  req: Request<DeleteSubCatType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(404).json({ err: "sub category could not found" });

    await deleteSubCategory({ _id });

    return res.status(200).json({ msg: "Succesfully Deleted..." });
  } catch (error: any) {
    log.error("Error while deleting category:", error.message);
    throw error;
  }
};
