import express from "express";
import cors from "cors"; // 리소스 공유
import morgan from "morgan"; // 모니터링 툴, 디버깅
import helmet from "helmet"; // 보안 툴
import "express-async-errors";
import tweetsRouter from "./routes/tweets.js";
import authRouter from "./routes/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (res, req) => {
  console.log("hello world");
  next();
});

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

const server = app.listen(config.host.port);
initSocket(server);
