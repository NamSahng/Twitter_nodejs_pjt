import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/tweets.js";
import { body, param, validationResult } from "express-validator";

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array() });
};

// GET /tweets
// GET /tweets?username=:username
router.get("/", tweetController.getTweets);

// GET /tweets/:id
router.get("/:id", tweetController.getTweet);

// POST /tweeets
router.post(
  "/",
  [
    body("text").notEmpty().withMessage("Write sth plz!"),
    body("username").notEmpty().withMessage("No username "),
    body("name").notEmpty().withMessage("No name"),
    validate,
  ],
  tweetController.createTweet
);

// PUT /tweets/:id
router.put(
  "/:id",
  [
    param("id").trim().notEmpty(),
    body("text").notEmpty().withMessage("Write sth plz!"),
    validate,
  ],
  tweetController.updateTweet
);

// DELETE /tweets/:id
router.delete(
  "/:id",
  [param("id").trim().notEmpty(), validate],
  tweetController.deleteTweet
);

export default router;
