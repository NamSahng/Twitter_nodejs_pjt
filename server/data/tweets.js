import * as userRepository from "./auth.js";
import "express-async-errors";
import { getTweets } from "../db/database.js";

export async function getAll() {
  return getTweets()
    .find({}, { sort: { createdAt: -1 } })
    .toArray()
    .then((result) => {
      console.log(result);
    });
}

export async function getAllByUsername(username) {
  return getTweets()
    .find({ username: username }, { sort: { createdAt: -1 } })
    .toArray()
    .then((result) => {
      console.log(result);
    });
}

export async function getById(id) {
  const found = getTweets().findOne({ id: Number(id) });
  if (!found) {
    return null;
  }
  return found;
}

export async function create(text, name, username, userId) {
  let num_id = await getTweets().findOne({}, { sort: { createdAt: -1 } });
  const tweet = {
    id: Number(num_id.id) + 1,
    text,
    createdAt: new Date(),
    name,
    username,
    userId,
  };
  console.log(tweet);
  return getTweets()
    .insertOne(tweet)
    .then((result) => {
      console.log(result);
    });
}

export async function update(id, text) {
  return getTweets()
    .updateOne({ id: Number(id) }, { $set: { text: text } })
    .then((result) => {
      console.log(result);
    });
}

export async function remove(id) {
  return getTweets()
    .deleteOne({ id: Number(id) })
    .then((result) => {
      console.log(result);
    });
}
