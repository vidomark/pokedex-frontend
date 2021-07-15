import axios from "axios";
import apiController from "./apiController";

export const fetchData = (url, headers = null) => {
  apiController.setState("get");
  return axios
    .get(url, { headers: headers })
    .then((result) => result)
    .catch((error) => console.log(error));
};

export const postData = (url, data, headers = null) => {
  // Pokemon filter doesn't work
  apiController.setState("post");
  return axios
    .post(url, data, { headers: headers })
    .then((result) => result)
    .catch((error) => console.log(error));
};
