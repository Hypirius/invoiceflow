import { Resend } from "resend";
import config from "./env";

export const resendClient = new Resend(config.EMAIL_SERVICE_SECRET);
