import axios from "axios";
import token from "../util/token";

export const fetchData = (url) => {
  return axios
    .get(url, { headers: { Authorization: `Bearer ${token.getToken()}` } })
    .then((result) => result)
    .catch((error) => console.log(error));
};

export const postData = (url, data, header = true) => {
  const headers = header
    ? { Authorization: `Bearer ${token.getToken()}` }
    : null;

  return axios
    .post(url, data, headers)
    .then((result) => result)
    .catch((error) => console.log(error));
};
