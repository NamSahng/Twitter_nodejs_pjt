const TOKEN = "token";

export default class TokenStorage {
  saveToken(token) {
    // 브라우저에서 이용하는 API
    // https://developer.mozilla.org/en-US/docs/Web/API/Storage
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    // clear 전체 삭제, removeItem(TOKEN) 해당 k-v 삭제
    localStorage.clear();
  }
}
