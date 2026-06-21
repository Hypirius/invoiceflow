import { Request, Response } from "express";
import uploadImageService from "./uploadImage.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";

function uploadImageController(req: Request, res: Response) {
  const { type } = req.query;
  const uploadDetails = uploadImageService(type as string);
  res
    .status(201)
    .json(
      new ApiSuccessResponse(
        "Successfully generated a signed upload url",
        uploadDetails,
      ),
    );
}

// TODO: response message could be more optimized
export default uploadImageController;
