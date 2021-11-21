import express from "express";
import "express-async-errors";
import * as data from "../data/tweets.js";

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", (req, res, next) => {
  const username = req.query.username;
  const tweets = username ? data.read_username(username) : data.read_all();
  res.status(200).json(tweets);
});

// GET /tweets/:id
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const tweets = data.read_id(id);
  if (tweets) {
    res.status(200).json(tweets);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// POST /tweeets
router.post("/", (req, res, next) => {
  const { text, name, username } = req.body;
  data.create_tweet(text, name, username);
  console.log(data.read_all());
  res.status(201).json({ message: `tweet created` });
});

// PUT /tweets/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const is_updated = data.update_tweet(id, text);
  if (is_updated) {
    const tweets = data.read_all();
    res.status(200).json(tweets);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  const is_deleted = data.delete_tweet(id);
  if (is_deleted) {
    const tweets = data.read_all();
    res.status(200).json(tweets);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

export default router;
