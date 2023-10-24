import { object, string, TypeOf } from "zod";

export const isValidObjectId = (value: string) =>
  /^[0-9a-fA-F]{24}$/.test(value);

const orderPayload = {
  body: object({
    user: string({
      required_error: "user's id is required!",
    }).refine((value) => isValidObjectId(value)),
    product: string({
      required_error: "product's id is required!",
    }).refine((value) => isValidObjectId(value)),
  }),
};

const orderParams = {
  params: object({
    _id: string({
      required_error: "Order's ID is Required!",
    }),
  }),
};

export const CreateOrderSchema = object({ ...orderPayload });
export const ReadOrderSchema = object({ ...orderParams });
export const UpdateOrderSchema = object({
  ...orderParams,
  ...orderPayload,
});
export const DeleteOrderSchema = object({ ...orderParams });

export type CreateOrderType = TypeOf<typeof CreateOrderSchema>;
export type ReadOrderType = TypeOf<typeof ReadOrderSchema>;
export type UpdateOrderType = TypeOf<typeof UpdateOrderSchema>;
export type DeleteOrderType = TypeOf<typeof DeleteOrderSchema>;
