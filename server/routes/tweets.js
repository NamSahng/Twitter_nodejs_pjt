import express from "express";
import "express-async-errors";

// db를 통해 key는 나중에 추가
// key가 트윗에 대한 id인지, user id 조금 헷갈림
let tweets = [
  {
    id: "1",
    text: "hello",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "bye!",
    createdAt: Date.now().toString(),
    name: "Ellie",
    username: "ellie",
  },
];
const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;
  // username 이 없으면 전체 트윗, 있으면 해당 트윗
  res.status(200).json(data);
});

// GET /tweets/:id
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// POST /tweeets
router.post("/", (req, res, next) => {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets]; // 제일 앞에 와야함
  res.status(201).json(tweet);
});

// PUT /tweets/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id);
  if (tweets.length == 0) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

export default router;