import axios from "axios";
import { useState, useEffect } from "react";

export const useHttp = (url, dependencies) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  const fetchData = (url) => {
    axios.get(url).then((data) => {
      setIsLoaded(true);
      setFetchedData(data);
    });
  };

  useEffect(() => {
    setIsLoaded(true);
    fetchData(url);
  }, dependencies);

  return [isLoaded, fetchedData];
};
