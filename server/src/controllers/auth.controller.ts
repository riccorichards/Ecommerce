import {
  CreateUserSchemaType,
  ReadUserSchemaType,
  UpdateUserSchemaType,
} from "../schemas/user.schema";
import { register } from "../services/auth.services";
import { findAllUsers, findUser, updateUser } from "../services/user.services";
import log from "../utils/logger";
import { Request, Response } from "express";

export const registerHandler = async (
  req: Request<CreateUserSchemaType["body"]>,
  res: Response
) => {
  try {
    const user = await register(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    log.error(error.message);
    return res.status(409).json({ msg: error.message });
  }
};

export const currentUser = async (req: Request, res: Response) => {
  try {
    return res.json(res.locals.user);
  } catch (error: any) {
    log.error(error.message);
    return res.status(400).json({ msg: error.message });
  }
};

export const getSpecificUserHandler = async (
  req: Request<ReadUserSchemaType["params"]>,
  res: Response
) => {
  try {
    const user = await findUser(req.params);
    return res.status(200).json(user);
  } catch (error: any) {
    log.error(error.message);
    return res.status(404).json({ msg: error.message });
  }
};

export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = findAllUsers();
    return res.status(200).json(users);
  } catch (error: any) {
    log.error(error.message);
    return res.status(400).json({ msg: error.message });
  }
};

export const updateUserHandler = async (
  req: Request<UpdateUserSchemaType["params"]>,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const findUserAndUpdate = await updateUser({ userId }, req.body, {
      new: true,
    });
    return res.status(201).json(findUserAndUpdate);
  } catch (error: any) {
    log.error(error.message);
    return res.status(404).json({ msg: error.message });
  }
};
