import { recurringInvoiceRemainderId } from "@/constants/recurringInvoiceRemander";
import { QueueEvents } from "bullmq";

const recurringInvoiceRemainderQueueEvents = new QueueEvents(
  recurringInvoiceRemainderId,
);

recurringInvoiceRemainderQueueEvents.on(
  "completed",
  ({ jobId, returnvalue }) => {
    console.log(jobId, returnvalue);
  },
);
