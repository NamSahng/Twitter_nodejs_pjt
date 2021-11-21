import express from "express";
import tweetRouter from "./routes/tweets.js";

// import cookieParser from "cookie-parser"; // 쿠키 파싱 툴
// import morgan from "morgan";  // 모니터링 툴
// import cors from "cors";      // 리소스 공유
// import helmet from "helmet";  // 보안 툴

const app = express();

// const corsOptions = {
//     origin: ["http://localhost:5500"],
//     optionsSuccessStatus: 200,
//     credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(cookieParser()); //

// app.use(cors(corsOptions));
// app.use(cookieParser()); //
// app.use(morgan("common")); // http://expressjs.com/en/resources/middleware/morgan.html
// app.use(helmet()); // https://github.com/helmetjs/helmet

app.use(express.json()); // json 파싱

// app.use("/", (res, req) => {
//     console.log("hello world");
//     next();
// });
app.get("/", (res, req) => {
  console.log("hello world");
  next();
});
app.use("/tweets", tweetRouter);

app.use((error, req, res, next) => {
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(8080);
