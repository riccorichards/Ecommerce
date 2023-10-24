import { CreateOrderType, ReadOrderType } from "../schemas/order.schema";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSpecificOrder,
  updateOrder,
} from "../services/order.services";
import log from "../utils/logger";
import { Request, Response } from "express";

export const createOrderHandler = async (
  req: Request<{}, {}, CreateOrderType["body"]>,
  res: Response
) => {
  try {
    const newOrder = await createOrder(req.body);

    return res.status(201).json(newOrder);
  } catch (error: any) {
    log.error("Error while creating order:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllOrdersHandler = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();

    return res.status(200).json(orders);
  } catch (error: any) {
    log.error("Error while fetching all orders:", error.message);
    throw error;
  }
};

export const getOrderHandler = async (
  req: Request<ReadOrderType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(400).json({ err: "Could not found the Order..." });

    const Order = await getSpecificOrder({ _id });

    return res.status(200).json(Order);
  } catch (error: any) {
    log.error("Error while fetching all Orders:", error.message);
    throw error;
  }
};

export const deleteOrderHandler = async (
  req: Request<ReadOrderType["params"]>,
  res: Response
) => {
  try {
    const { _id } = req.params;

    if (!_id)
      return res.status(404).json({ err: "Could not found the Order..." });

    await deleteOrder({ _id });

    return res.status(200).json({ msg: "Succesfully deleted..." });
  } catch (error: any) {
    log.error("Error while deleting Order:", error.message);
    throw error;
  }
};
