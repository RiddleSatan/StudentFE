import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 const sendRequest = async ({ url, method = "GET", body = null }) => {
  setLoading(true);
  setError(null);

  try {
    const response = await axios({
      url: `${BASE_URL}${url}`,
      method,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    setData(response.data);
    return response.data; // 🔥 This must be here to return created student
  } catch (err) {
    setError(err?.response?.data?.message || err.message || "Something went wrong");
    return null; // Prevents frontend crashes
  } finally {
    setLoading(false);
  }
};


  return { data, loading, error, sendRequest };
};

export default useApi;
