import recurringInvoiceRemainderQueue from "./reminderQueue";
import { DataPayload } from "./types";

async function addToInvoiceRemainder(
  id: string,
  data: DataPayload,
  pattern: string,
) {
  await recurringInvoiceRemainderQueue.upsertJobScheduler(
    `recurring-invoice-remainder-${id}`,
    { pattern }, // Cron syntax: Second, Minute, Hour, Day, Month, Day-of-week
    {
      name: `invoice-remainder-${id}`,
      data,
      opts: {
        attempts: 5, // Retry attempts
        backoff: 3000, // MS
      },
    },
  );
}

export default addToInvoiceRemainder;
