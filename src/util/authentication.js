class Authentication {
  constructor() {
    this.redirect = null;
    this.message = null;
  }

  login(callback, token) {
    localStorage.setItem("token", token);
    this.redirect = true;
    this.message = "You have been successfully logged in!";
    callback();
  }

  logout(callback) {
    localStorage.removeItem("token");
    this.redirect = true;
    this.message = "You have been successfully logged out!";
    callback();
  }

  isAuthenticated() {
    return localStorage.getItem("token") != null;
  }
}

export default new Authentication();
