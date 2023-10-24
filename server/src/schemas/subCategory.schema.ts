import { object, string, TypeOf, number } from "zod";
import { isValidObjectId } from "./product.schema";

const subCatPayload = {
  body: object({
    title: string({
      required_error: "Title is Required!",
    }).email("Invalid Email Format"),
    desc: string({
      required_error: "Description is required!",
    }),
    mainCategoryId: string({
      required_error: "Main category is required!",
    }).refine((value) => isValidObjectId(value), {
      message: "Invalid ObjectId format for subCategoryId",
    }),
  }),
};

const subCatParams = {
  params: object({
    _id: string({
      required_error: "Product's ID is Required!",
    }),
  }),
};

export const CreateSubCatSchema = object({ ...subCatPayload });
export const ReadSubCatSchema = object({ ...subCatParams });
export const UpdateSubCatSchema = object({
  ...subCatParams,
  ...subCatPayload,
});
export const DeleteSubCatSchema = object({ ...subCatParams });

export type CreateSubCatType = TypeOf<typeof CreateSubCatSchema>;
export type ReadSubCatType = TypeOf<typeof ReadSubCatSchema>;
export type UpdateSubCatType = TypeOf<typeof UpdateSubCatSchema>;
export type DeleteSubCatType = TypeOf<typeof DeleteSubCatSchema>;
