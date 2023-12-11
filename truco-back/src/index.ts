import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {}); // Connect to MongoAtlas db

        app.listen(PORT, () => {
            console.log(
                `[server]: Server is running at http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();
