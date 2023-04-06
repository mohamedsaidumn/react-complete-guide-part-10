import React, { useMemo, useState, useCallback } from "react";
import { HTTP_REQUEST_CONFIG } from "../types";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(
    async (
      requestConfig: HTTP_REQUEST_CONFIG,
      applyData: (tasksObj: any) => void
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        applyData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );

  return useMemo(() => {
    return { isLoading: isLoading, error: error, sendRequest: sendRequest };
  }, [isLoading, error, sendRequest]);
};

export default useHttp;
