import express from "express";
import path from "path";

const app = express();

app.get("/api", (req, res) => {
    res.send("Hello World2");
})
export default app;
