import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

//Import Routes
import authRoutes from "./routes/authRoutes.js";
import goalsListRoutes from "./routes/goalsListRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

config();
connectDB();

const app = express();

//parsing BODY middlewares to handle json, .etc
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Not fully required, it just allows automatic parse in htmlForm submission to be accessible to req.body


//API Routes
app.use("/auth", authRoutes);
app.use("/goals", goalsListRoutes);
app.use("/tasks", taskRoutes);

const PORT = 5001;
app.listen(PORT, () =>{
    console.log(`Server running on port: ${PORT}`)
});

//"Have it then Leave it"
// It is imperative that we handle disconnection in cases of app breaking to avoid memory leaks
// Handle unhandled promise rejections (e.g, database connection errors)
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