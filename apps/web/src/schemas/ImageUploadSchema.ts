import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "@/config/imageUploadConstants";
import z from "zod";

const imageUploadSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Image file size cannot exceed over 5 mb",
  })
  .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
    message: "Only jpg and png images are accepted",
  });

export type imageUploadType = z.infer<typeof imageUploadSchema>;
export default imageUploadSchema;
