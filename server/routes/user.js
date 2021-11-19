import express from "express";
import fs from "fs";

const router = express.Router();

router.use((req, res, next) => {
  console.log("middleware for users!");
  next();
});

router.get("/", (req, res) => {
  const id = req.query.id;
  console.log(req.query);
  if (id === undefined) {
    // 모든 트윗을 가져와 보여준다.
    return res.status(200).send("get all twits");
  }
  // 사용자의 트윗을 보여준다
  res.status(200).send(`get ${id}'s twit`);
});

router.post("/", (req, res) => {
  // 세션이나 쿠키를 이용해 사용자 확인 후, 요청 받은 글을 서버에 저장한다.
  const id = req.body.id;
  const twit = req.body.twit;
  // checkID(id, )
  // 트윗 키 값 생성
  // save(key, id, twit) -> 트윗 데이터 베이스에 저장
  return res.status(201).send(`twit saved! ${id}: ${twit}`);
});

router.put("/", (req, res) => {
  // 세션이나 쿠키를 이용해 사용자 확인 후, 요청 받은 글을 수정한다
  const id = req.body.id;
  const twitKey = req.body.twitKey;
  const newtwit = req.body.twit;
  // checkID(id, )
  // save(key, id, twit) -> 변경사항 데이터 베이스에 저장
  res.status(201).send(`twit changed! ${twitKey}, ${id}, ${newtwit}`);
});

router.delete("/", (req, res) => {
  // 세션이나 쿠키를 이용해 사용자 확인 후, 요청 받은 글을 삭제한다
  const id = req.body.id;
  const twitKey = req.body.twitKey;
  // checkID(id, )
  // delete twit 트윗 삭제
  res.status(201).send(`twit removed ${twitKey}, ${id}`);
});

export default router;
