import axios from "axios";
import token from "../util/token";

export const fetchData = (url) => {
  return axios
    .get(url, { headers: { Authorization: `Bearer ${token.getToken()}` } })
    .then((result) => result)
    .catch((error) => console.log(error));
};

export const postData = (url, data) => {
  return axios
    .post(url, data, {
      headers: { Authorization: `Bearer ${token.getToken()}` },
    })
    .then((result) => result)
    .catch((error) => console.log(error));
};
