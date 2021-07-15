import axios from "axios";
import token from "../util/token";
import apiController from "./apiController";

export const fetchData = (url) => {
  apiController.setState("get");
  return axios
    .get(url, { headers: { Authorization: `Bearer ${token.getToken()}` } })
    .then((result) => result)
    .catch((error) => console.log(error));
};

export const postData = (url, data) => {
  apiController.setState("post");
  return axios
    .post(url, data, { Authorization: `Bearer ${token.getToken()}` })
    .then((result) => result)
    .catch((error) => console.log(error));
};
