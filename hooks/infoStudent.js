// useApi.js
import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // ✅ change if needed

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = async ({ url, method = "GET", body = null }) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios({
        url: `${BASE_URL}${url}`,
        method,
        data: body,
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, sendRequest };
};

export default useApi;
