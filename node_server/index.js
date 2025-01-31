import express from "express";
import { handler } from "./handler.js";


const app  = express();
const port = 8080;

app.use(handler);

app.listen(port, () => {
    console.log(`The application is running on port ${port}`);
});