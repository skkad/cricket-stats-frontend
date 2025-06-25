import { useState, useEffect, useCallback } from "react";

interface useAPIProps {
  url: string;
  method: string;
  id?: string | undefined | "";
}

export const useApi = ({ url, method, id }: useAPIProps) => {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Record<string, unknown> | null>(null);

  const fetchData = useCallback(async () => {
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
      // setError(typeof error === "object" && error !== null ? error : null);
      setError(
        typeof error === "object" && error !== null
          ? (error as Record<string, unknown>)
          : { message: String(error) }
      );
      setLoading(false);
    }
  }, [url, id, method]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
