import axios from "axios";
import { useState, useEffect } from "react";

// array of dependencies
export const useFetch = (url, dependencies) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  const fetchData = (url) => {
    axios
      .get(url)
      .then((data) => setFetchedData(data))
      .then(setIsLoaded(true))
      .catch(console.error());
  };

  useEffect(() => {
    setIsLoaded(false);
    fetchData(url);
  }, dependencies);

  return [isLoaded, fetchedData];
};
