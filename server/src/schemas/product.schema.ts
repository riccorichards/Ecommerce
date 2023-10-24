import { object, string, TypeOf, number } from "zod";

export const isValidObjectId = (value: string) =>
  /^[0-9a-fA-F]{24}$/.test(value);

const productPayload = {
  body: object({
    title: string({
      required_error: "Title is Required!",
    }).email("Invalid Email Format"),
    desc: string({
      required_error: "Description is required!",
    }),
    image: string(),
    price: number({
      required_error: "Price is required!",
    }),
    discount: number(),
    shopping: number(),
    subCategoryId: string({
      required_error: "Sub category is required!",
    }).refine((value) => isValidObjectId(value), {
      message: "Invalid ObjectId format for subCategoryId",
    }),
  }),
};

const productParams = {
  params: object({
    _id: string({
      required_error: "Product's ID is Required!",
    }),
  }),
};

export const CreateProductSchema = object({ ...productPayload });
export const ReadProductSchema = object({ ...productParams });
export const UpdateProductSchema = object({
  ...productParams,
  ...productPayload,
});
export const DeleteProductSchema = object({ ...productParams });

export type CreateProductType = TypeOf<typeof CreateProductSchema>;
export type ReadProductType = TypeOf<typeof ReadProductSchema>;
export type UpdateProductType = TypeOf<typeof UpdateProductSchema>;
export type DeleteProductType = TypeOf<typeof DeleteProductSchema>;
