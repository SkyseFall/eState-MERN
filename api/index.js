import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB !");
    })
    .catch((err) => {
        console.log("####", err)
    });

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000 !!!");
})

app.use(express.json());

// APIs router list.
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);


// Middleware
// to catch an error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errMessage = err.message || "Intenal server error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        errMessage,
    });
});