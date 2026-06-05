import cloudinary from "@/config/cloudinary";
import config from "@/config/env";
import { SignatureFailedError } from "./ErrorClass";

function uploadImageService() {
  const cloudinarySignReqParams = {
    timestamp: Math.floor(new Date().getTime() / 1000), // Converted current time(ms) to seconds
    folder: config.CLOUDINARY_UPLOAD_FOLDER,
    tags: "profile-image",
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
    cloudName: config.CLOUDINARY_CLOUD_NAME,
    ...cloudinarySignReqParams,
  };
}
// TODO: Is the signature generation in app or cloud? If cloud then wrapping it in promise might save performance by relieving the main thread

export default uploadImageService;
