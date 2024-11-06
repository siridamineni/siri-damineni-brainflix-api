import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

//middleware
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
