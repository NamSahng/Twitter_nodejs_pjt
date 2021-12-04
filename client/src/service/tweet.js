// 서버에서 구현한 API를 이용
// 새로고침하더라도 서버에 데이터가 있어 없어지지 않음

// header content type 처리
// 에러처리
// json으로 응답을 받는 부분 등의 반복 코드 개선

export default class TweetService {
  // 외부에서 base URL을 가지고 온다
  constructor(http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }

  async getTweets(username) {
    let query = username ? `?username=${username}` : "";
    // 서버에서 url을 통해 response를 받는다
    return this.http.fetch(`/tweets${query}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets/`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        text,
        username: "ellie",
        name: "Ellie",
      }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  // 소켓: 아래만 추가됨. 새로운 트윗이 생기면 전달하는 역할
  onSync(callback) {
    return this.socket.onSync("tweets", callback);
  }
}
