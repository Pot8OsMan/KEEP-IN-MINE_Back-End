import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

//Import Routes
import toDoListRoutes from "./routes/toDoListRoutes.js"

config();
connectDB();

const app = express();

//API Routes
app.use("/list", toDoListRoutes);

const PORT = 5001;
app.listen(PORT, () =>{
    console.log(`Server running on port: ${PORT}`)
});

//Handle unhandled promise rejections (e.g, database connection errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection", err);
    ServiceWorkerRegistration.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

//Handle uncaught excepions
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception", err);
    await disconnectDB();
    process.exit(1);
});

//Graceful shutdown when a signal (SIGTERM) from app is stopped in production
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down in progress");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});