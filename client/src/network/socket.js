import socket from "socket.io-client";

export default class Socket {
  constructor(baseURL, getAccessToken) {
    // auth: (cb) => cb({ token: getAccessToken() })
    // 위 대신에, 아래와 같이 전달하고,
    // auth :  token: getAccessToken()
    // server/connection/socket.js에서
    // socket.handshake.query로 받을 수 있지만,
    // 이렇게 쿼리를 통해서 전달하면 브라우저 상에서 토큰이 보이고 로그에도 남을 수 있음
    this.io = socket(baseURL, {
      auth: (cb) => cb({ token: getAccessToken() }),
    });

    this.io.on("connect_error", (err) => {
      console.log("socket error", err.message);
    });
  }

  onSync(event, callback) {
    // 연결이 안되었을 때만 연결하도록
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (message) => callback(message));
    return () => this.io.off(event);
  }
}
