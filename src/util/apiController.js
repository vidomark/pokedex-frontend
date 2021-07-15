// For handling get or post request
class ApiController {
  constructor() {
    localStorage.setItem("state", "get");
  }

  setState(state) {
    localStorage.setItem("state", state);
  }

  getState() {
    return localStorage.getItem("state");
  }
}

export default new ApiController();
