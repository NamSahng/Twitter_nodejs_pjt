import express from "express";
import "express-async-errors";

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

// Read
function read_all() {
  return tweets;
}
function read_username(username) {
  return tweets.filter((tweet) => tweet.username === username);
}
function read_id(id) {
  return tweets.find((tweet) => tweet.id === id);
}

// Create
function create_tweet(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
}

// Update
function update_tweet(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    return true;
  } else {
    return false;
  }
}

// Delete
function delete_tweet(id) {
  const idx = tweets.findIndex((x) => x.id === id);
  if (idx !== -1) {
    tweets.splice(idx, 1);
    return true;
  } else {
    return false;
  }
}
export {
  read_all,
  read_username,
  read_id,
  create_tweet,
  update_tweet,
  delete_tweet,
};
