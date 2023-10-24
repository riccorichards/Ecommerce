import { CreateProductType, ReadProductType, UpdateProductType } from "../schemas/product.schema";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSpecificProduct,
  updateProduct,
} from "../services/product.services";
import log from "../utils/logger";
import { Request, Response } from "express";

export const createProductHandler = async (
  req: Request<{}, {}, CreateProductType["body"]>,
  res: Response
) => {
  try {
    const newProduct = await createProduct(req.body);

    return res.status(201).json(newProduct);
  } catch (error: any) {
    log.error("Error while creating product:", error.message);
    throw error;
  }
};

export const getAllProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    return res.status(200).json(products);
  } catch (error: any) {
    log.error("Error while fetching all products:", error.message);
    throw error;
  }
};

export const getProductHandler = async (
  req: Request<ReadProductType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(400).json({ err: "Could not found the product..." });

    const product = await getSpecificProduct({ _id });

    return res.status(200).json(product);
  } catch (error: any) {
    log.error("Error while fetching all products:", error.message);
    throw error;
  }
};

export const updateProductHandler = async (
  req: Request<UpdateProductType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(404).json({ err: "Could not found the product..." });

    const updatedProduct = await updateProduct({ _id }, req.body, {
      new: true,
    });

    return res.status(200).json(updatedProduct);
  } catch (error: any) {
    log.error("Error while update product:", error.message);
    throw error;
  }
};

export const deleteProductHandler = async (
  req: Request<ReadProductType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(404).json({ err: "Could not found the product..." });

    await deleteProduct({ _id });

    return res.status(200).json({ msg: "Succesfully deleted..." });
  } catch (error: any) {
    log.error("Error while deleting product:", error.message);
    throw error;
  }
};
