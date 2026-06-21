import cloudinary from "@/config/cloudinary";
import config from "@/config/env";
import { SignatureFailedError } from "./ErrorClass";
import validateSchema from "../auth/utils/validateSchema";
import { uploadType, uploadTypeSchema } from "./uploadTypeSchema";

const presets = {
  "profile-image": "profile_image_preset",
  "organisation-logo": "organisation_logo_preset",
  "invoice-pdf": "invoice_pdf_preset",
};

function uploadImageService(type: string) {
  const result = validateSchema(uploadTypeSchema, type) as uploadType;

  const cloudinarySignReqParams = {
    timestamp: Math.floor(Date.now() / 1000), // Converted current time(ms) to seconds
    upload_preset: presets[result],
  };

  const signature = cloudinary.utils.api_sign_request(
    cloudinarySignReqParams,
    config.CLOUDINARY_API_SECRET,
  );

  if (!signature) {
    throw new SignatureFailedError();
  }

  return {
    signature,
    apiKey: config.CLOUDINARY_API_KEY,
    ...cloudinarySignReqParams,
  };
}

export default uploadImageService;
