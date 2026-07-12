import { Worker } from "bullmq";
import { connection } from "./reminderQueue";
import { DataPayload } from "./types";
import sendEmail from "@/utils/sendEmail";
import config from "@/config/env";
import { recurringInvoiceRemainderId } from "@/constants/recurringInvoiceRemander";

const invoiceRemainderWorker = new Worker(
  recurringInvoiceRemainderId,
  async (job) => {
    const data = job.data as DataPayload;

    await sendEmail({
      from: config.EMAIL_FROM, // change this
      to: data.email,
      subject: "",
      templateOptions: { id: "41" },
    });
  },
  { connection, concurrency: 2 },
);

export default invoiceRemainderWorker;
// .close() on shutdown
