import MongoDb from "mongodb";
import { config } from "../config.js";

let db;

export async function connectDB() {
  return new MongoDb.MongoClient(config.db.host) //
    .connect()
    .then((client) => {
      db = client.db();
    });
}

export function getUsers() {
  return db.collection("users"); // 자동으로 대문자로 변경됨
}

export function getTweets() {
  return db.collection("tweets");
}
