import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import requestLogger from "./middlewares/requestLogger";
import pusherRouter from "./routers/pusherRouter";
import authRouter from "./routers/authRouter";
import { populateSession } from "./middlewares/sessions";

dotenv.config();
const app = express();

app.use(express.json()); // for parsing json (and create req.body etc)
app.use(cookieParser()); // for parsing cookies
app.use(express.urlencoded({ extended: true })); // for parsing URL-encoded request bodies

if (process.env.DEBUG === "true") { // for development
    app.use(
        cors()
    );
    console.log("CORS enabled");
}

app.use(
    session({
        name: "qid",
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI!,
            touchAfter: 24 * 3600, // 1 day
        }),
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            sameSite: "none",
            secure: true,
        },
    })
);

app.use(populateSession); // for populating req.session.user

app.use(express.static(path.join(__dirname, 'public'))); // for serving static files

app.use(requestLogger); // for logging requests and status codes

app.use("/api/pusher", pusherRouter);

app.use("/api/auth", authRouter);

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})


export default app;