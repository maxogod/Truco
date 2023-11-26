import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import pusherRouter from "./routers/pusherRouter";

dotenv.config();
const app = express();

app.use(express.json()); // for parsing json (and create req.body etc)
app.use(cookieParser()); // for parsing cookies
app.use(express.urlencoded({ extended: true })); // for parsing URL-encoded request bodies

if (process.env.DEBUG === "true") { // for development
    app.use(
        cors({
            origin: "http://localhost:3001", // allow cors from :3001
            credentials: true,
        })
    );
    console.log("CORS enabled");
}

app.use(express.static(path.join(__dirname, 'public'))); // for serving static files

app.use("/api/pusher", pusherRouter);

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})


export default app;