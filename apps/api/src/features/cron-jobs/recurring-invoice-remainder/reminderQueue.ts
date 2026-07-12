import { redisClient } from "@/config/redis";
import { recurringInvoiceRemainderId } from "@/constants/recurringInvoiceRemander";
import { NodeRedisRawClient, Queue, createNodeRedisClient } from "bullmq";

export const connection = createNodeRedisClient(
  redisClient as unknown as NodeRedisRawClient,
);

const recurringInvoiceRemainderQueue = new Queue(recurringInvoiceRemainderId, {
  connection,
  
});

export default recurringInvoiceRemainderQueue;
