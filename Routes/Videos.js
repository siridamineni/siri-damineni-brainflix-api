import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const router = express.Router();

router.get("/", (req, res) => {
  const videos = fs.readFileSync("./data/videos.json", "utf8");
  const parsedVideos = JSON.parse(videos);
  const fitleredData = parsedVideos.map((item) => {
    return Object.fromEntries(
      Object.entries(item).filter(
        ([key]) =>
          key === "id" ||
          key === "title" ||
          key === "channel" ||
          key === "image"
      )
    );
  });

  res.json(fitleredData);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const videos = fs.readFileSync("./data/videos.json", "utf8");
  const parsedVideos = JSON.parse(videos);
  const findVideo = parsedVideos?.find((item) => item.id === id);
  res.json(findVideo);
});

router.post("/", (req, res) => {
  const videos = fs.readFileSync("./data/videos.json", "utf8");
  const parsedVideos = JSON.parse(videos);
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    channel: "Siri Damineni",
    image:
      req?.body?.image || "http://localhost:5050/images/default-preview.jpg",
    views: "3,092,284",
    likes: "75,985",
    duration: "49:20",
    video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [
      {
        id: uuidv4(),
        name: "Uzo Anayolisa",
        comment:
          "The historical perspective, combined with the technological advancements, offers a comprehensive view of how trains have shaped our world. I'm eager to learn more about the fascinating stories behind these incredible locomotives. Keep the railway adventures coming!",
        likes: 3,
        timestamp: 1701670662000,
      },
    ],
  };
  parsedVideos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(parsedVideos));
  res.status(201).json(parsedVideos);
});

export default router;
