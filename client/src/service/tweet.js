// 서버에서 구현한 API를 이용
// 새로고침하더라도 서버에 데이터가 있어 없어지지 않음
export default class TweetService {
  // 외부에서 base URL을 가지고 온다
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getTweets(username) {
    let query = username ? `?username=${username}` : "";
    // 서버에서 url을 통해 response를 받는다
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    // 받으면 json으로 변환
    const data = await response.json();
    // 응답이 200이 아니면 에러를 던짐
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async postTweet(text) {
    const response = await fetch(`${this.baseURL}/tweets/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        username: "ellie",
        name: "Ellie",
      }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.message);
    }
    console.log(data);
    return data;
  }

  async deleteTweet(tweetId) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 204) {
      const data = await response.json();
      throw new Error(data.message);
    }
  }

  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
