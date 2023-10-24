import { object, string, number, TypeOf } from "zod";

export const isValidObjectId = (value: string) =>
  /^[0-9a-fA-F]{24}$/.test(value);

const orderItemPayload = {
  body: object({
    order: string({
      required_error: "order's id is required!",
    }).refine((value) => isValidObjectId(value)),
    totalPrice: number({
      required_error: "Total price is required!",
    }),
    productQty: number({
      required_error: "product qty is required!",
    }),
  }),
};

const orderItemParams = {
  params: object({
    _id: string({
      required_error: "Order's ID is Required!",
    }),
  }),
};

export const CreateOrderItemSchema = object({ ...orderItemPayload });
export const ReadOrderItemSchema = object({ ...orderItemParams });
export const UpdateOrderItemSchema = object({
  ...orderItemParams,
  ...orderItemPayload,
});
export const DeleteOrderItemSchema = object({ ...orderItemParams });

export type CreateOrderItemType = TypeOf<typeof CreateOrderItemSchema>;
export type ReadOrderItemType = TypeOf<typeof ReadOrderItemSchema>;
export type UpdateOrderItemType = TypeOf<typeof UpdateOrderItemSchema>;
export type DeleteOrderItemType = TypeOf<typeof DeleteOrderItemSchema>;
