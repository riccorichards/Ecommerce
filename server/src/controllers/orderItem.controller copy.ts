import {
  CreateOrderItemType,
  ReadOrderItemType,
  UpdateOrderItemType,
} from "../schemas/orderItem.schema";
import {
  createOrderItem,
  deleteOrderItem,
  getAllOrderItems,
  getSpecificOrderItem,
  updateOrderItem,
} from "../services/orderItem.services";
import log from "../utils/logger";
import { Request, Response } from "express";

export const createOrderItemHandler = async (
  req: Request<{}, {}, CreateOrderItemType["body"]>,
  res: Response
) => {
  try {
    const newOrderItem = await createOrderItem(req.body);

    return res.status(201).json(newOrderItem);
  } catch (error: any) {
    log.error("Error while creating orderItem:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllOrderItemsHandler = async (req: Request, res: Response) => {
  try {
    const orderItems = await getAllOrderItems();

    return res.status(200).json(orderItems);
  } catch (error: any) {
    log.error("Error while fetching all orders:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrderItemHandler = async (
  req: Request<ReadOrderItemType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(400).json({ err: "Could not found the OrderItem..." });

    const OrderItem = await getSpecificOrderItem({ _id });

    return res.status(200).json(OrderItem);
  } catch (error: any) {
    log.error("Error while fetching all OrderItems:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateOrderItemHandler = async (
  req: Request<UpdateOrderItemType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(404).json({ err: "Order item could not found" });

    const updatedOrderItem = await updateOrderItem({ _id }, req.body, {
      new: true,
    });

    return res.status(201).json(updatedOrderItem);
  } catch (error: any) {
    log.error("Error while updating OrderItem:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteOrderItemHandler = async (
  req: Request<ReadOrderItemType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(404).json({ err: "Could not found the Order..." });

    await deleteOrderItem({ _id });

    return res.status(200).json({ msg: "Succesfully deleted..." });
  } catch (error: any) {
    log.error("Error while deleting OrderItem:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
