import express from "express";
import * as path from "path";

const app = express();

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html')); 
})

app.listen(8080, () => {
    console.log('App listening on port 8080');
});
