import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        // 모든 origin을 허용하는 것이아니라 허용한 origin만 허용할 수 있도록
        origin: config.cors.allowedOrigin,
      },
    });

    this.io.use((socket, next) => {
      // 로그인한 사람들에게만 트윗을 전달할 것이기 때문에 토큰을 이용
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentication error"));
      }
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(new Error("Authentication error"));
        }
        next();
      });
    });

    this.io.on("connection", (socket) => {
      console.log("Socket client connected");
    });
  }
}

// 한번만 인스턴스를 생성하는 싱글톤 기법
// 생성자를 private하게 만들고, static 함수를 통해 계속 같은 인스턴스를 사용하게 하는 방법
// typescript나 java는 가능하나, javascript 문법에서는 아래처럼 밖에 안됨
let socket;
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}
export function getSocketIO() {
  if (!socket) {
    throw new Error("Please call init first");
  }
  return socket.io;
}
