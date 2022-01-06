import * as userRepository from "./auth.js";
import "express-async-errors";
import { getTweets } from "../db/database.js";
import MongoDb from "mongodb";
const ObjectId = MongoDb.ObjectId;

export async function getAll() {
  return getTweets() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getAllByUsername(username) {
  return getTweets()
    .find({ username: username }, { sort: { createdAt: -1 } })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
}
export async function create(text, userId) {
  // object deconstruction이라고 함 user.name 을 바로 받음
  // 아래처럼 join을 통해 하는 것이 아니라 NoSQL은 관계 없이 중복 저장하는 것이 맞다
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    // id는 mongodb에서 따로 만들어줌
    text,
    createdAt: new Date(),
    userId,
    name: name,
    username: username,
    url: url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
}

export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text } },
      { returnDocument: "after" } // 업데이트 된 이후에 도큐먼트를 반환
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  return getTweets().deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
  // return tweets.map((tweet)=> mapOptionalTweet(tweet));
}
