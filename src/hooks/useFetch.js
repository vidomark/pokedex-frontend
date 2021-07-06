import axios from "axios";
import { useState, useEffect } from "react";

// array of dependencies
export const useFetch = (url, dependencies) => {
  const [fetchedData, setFetchedData] = useState(null);

  const fetchData = (url) => {
    axios.get(url).then((data) => setFetchedData(data));
  };

  useEffect(() => {
    fetchData(url);
  }, dependencies);

  return fetchedData;
};
