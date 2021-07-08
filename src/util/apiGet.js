import axios from "axios";

export const fetchData = (url) => {
  return axios
    .get(url)
    .then((result) => result.data)
    .catch((error) => console.log(error));
};
