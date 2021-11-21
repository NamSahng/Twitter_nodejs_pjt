import express from "express";

const router = express.Router();

let database = [
  {
    key: 1,
    id: 1,
    text: "Hi",
    createdAt: "2021-05-09T04:20:57.000Z",
    name: "Bob",
    username: "bob",
    url: "https://img.icons8.com/office/80/000000/beyonce.png",
  },
  {
    key: 2,
    id: 2,
    text: "Bye",
    createdAt: "2021-05-10T04:20:57.000Z",
    name: "a",
    username: "a",
    url: "https://img.icons8.com/office/80/000000/einstein.png",
  },
  {
    key: 3,
    id: 2,
    text: "Thx",
    createdAt: "2021-05-11T04:20:57.000Z",
    name: "a",
    username: "a",
    url: "https://img.icons8.com/office/80/000000/einstein.png",
  },
];

router.get("/", (req, res) => {
  const username = req.query.username;
  if (username === undefined) {
    return res.status(200).send(database);
  }
  res
    .status(200)
    .send(database.filter((database) => database.username === username));
});

router.get("/:id", (req, res) => {
  res
    .status(200)
    .send(database.filter((database) => String(database.id) === req.params.id));
});

router.post("/", (req, res) => {
  const tweet = {
    key: database.slice(-1)[0]["key"] + 1,
    id: req.body.id,
    createdAt: new Date(),
    name: req.body.name,
    username: req.body.username,
    text: req.body.text,
  };
  database.push(tweet);
  return res.status(201).send(database);
});

router.put("/:id", (req, res) => {
  const db_idx = database.findIndex((x) => x.key === req.body.key);
  database[db_idx].text = req.body.text;
  console.log(database);
  res.status(200).send(database[db_idx]);
});

router.delete("/:key", (req, res) => {
  const db_idx = database.findIndex((x) => String(x.key) === req.params.key);
  database.splice(db_idx, 1);
  console.log(database);
  res.status(204).send(database);
});

export default router;
