import express from "express";

//Import Routes
import toDoListRoutes from "./routes/toDoListRoutes.js"

const app = express();

//API Routes
app.use("/list", toDoListRoutes);

const PORT = 5001;
app.listen(PORT, () =>{
    console.log(`Server running on port: ${PORT}`)
});