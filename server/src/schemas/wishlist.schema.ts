import { object, string, TypeOf } from "zod";

export const isValidObjectId = (value: string) =>
  /^[0-9a-fA-F]{24}$/.test(value);

const wishlistPayload = {
  body: object({
    user: string({
      required_error: "user's id is required!",
    }).refine((value) => isValidObjectId(value)),
    product: string({
      required_error: "product's id is required!",
    }).refine((value) => isValidObjectId(value)),
  }),
};

const wishlistParams = {
  params: object({
    _id: string({
      required_error: "Order's ID is Required!",
    }),
  }),
};

export const CreateWishlistSchema = object({ ...wishlistPayload });
export const ReadWishlistSchema = object({ ...wishlistParams });
export const UpdateWishlistSchema = object({
  ...wishlistParams,
  ...wishlistPayload,
});
export const DeleteWishlistSchema = object({ ...wishlistParams });

export type CreateWishlistType = TypeOf<typeof CreateWishlistSchema>;
export type ReadWishlistType = TypeOf<typeof ReadWishlistSchema>;
export type UpdateWishlistType = TypeOf<typeof UpdateWishlistSchema>;
export type DeleteWishlistType = TypeOf<typeof DeleteWishlistSchema>;
