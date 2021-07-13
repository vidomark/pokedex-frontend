class Token {
  login(callback, token) {
    localStorage.setItem("token", token);
    callback();
  }

  logout(callback) {
    localStorage.removeItem("token");
    callback();
  }

  getToken() {
    return localStorage.getItem("token");
  }

  available() {
    return localStorage.getItem("token") != null;
  }
}

export default new Token();
