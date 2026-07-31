import dotenv from "dotenv";

dotenv.config({ path: "./tests/.env.test" });

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  throw reason;
});
