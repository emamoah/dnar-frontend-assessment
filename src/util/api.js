import axios from "axios";
import { useEffect, useRef, useState } from "react";

const BASE_URL = 'https://api.coingecko.com/api/v3';

function useGet(url) {
  const URL = BASE_URL + url;
  const [isPending, setIsPending] = useState(true);
  let error = useRef(null);
  let data = useRef(null);

  useEffect(() => {
    axios.get(URL).then(res => {
      data.current = res.data;
      setIsPending(false);
    }).catch(err => {
      console.log('fetch error: ', err);
      error.current = err;
      setIsPending(false);
    });
  }, [URL]);

  return {
    isPending,
    data: data.current,
    error: error.current
  };
}

const exports = {
  useGet
};

export default exports;