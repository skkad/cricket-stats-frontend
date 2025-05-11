import React, { useState, useEffect } from "react";

interface useAPIProps<T> {
  url: string;
  method: string;
  id?: any;
}

export const useApi = <T = any>({ url, method, id }: useAPIProps<T>) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<any>(null);

  const fectchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${url}/${id}`,
        {
          method: method,
        }
      );
      const result = await response.json();
      console.log("Result", result);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fectchData();
  }, [url, method, id]);

  return { data, loading, error };
};
