import axios from "axios";

export const fetchData = (url) => {
  return axios
    .get(url)
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const postData = (url, data) => {
  return axios
    .post(url, data)
    .then((result) => result)
    .catch((error) => console.log(error));
};
