import { Request, Response } from "express";
import webhookService from "./webhook.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";

async function webhookController(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;

  const data = await webhookService(sig, req.body);

  res
    .status(200)
    .json(
      new ApiSuccessResponse(
        "Successfully activated organisation stripe account",
        data,
      ),
    );
}

export default webhookController;
