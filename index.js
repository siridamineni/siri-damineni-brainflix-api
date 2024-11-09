import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Videos from "./Routes/Videos.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
//middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(`/videos`, Videos);
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
