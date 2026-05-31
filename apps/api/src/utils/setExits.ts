import { Server } from "http";
import prisma from "../config/db";

function setGracefulExits(server: Server) {
  process.on("uncaughtException", (err) => {
    console.error("A fatal uncaught error exception occured.", err.message);
    handleExits(server);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error(
      "A fatal uncaught error rejection occured at:",
      promise,
      "reason:",
      reason,
    );

    handleExits(server);
    process.exit(1);
  });

  process.on("SIGINT", () => {
    console.error("Client is terminated forcefully.");

    handleExits(server);
    process.exit(1);
  });

  process.on("SIGTERM", () => {
    console.error("Shutdown signal received, shutting down.");
    handleExits(server);
    process.exit(0);
  });
}

function handleExits(server: Server) {
  server.close(() => console.log("Server is shutting down"));
  prisma.$disconnect();
  //   TODO: Add Logger support
}

export default setGracefulExits;
