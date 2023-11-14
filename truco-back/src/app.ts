import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

export default app;
