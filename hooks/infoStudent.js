import { useState } from "react"
import axios from "axios";

const BASE_URL="http://localhost:8080";

const useApi=()=>{
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const sendRequest=async({url,method="GET",body=null,})=>{
    setLoading(true);
    setError("");
  try {
      const response= await axios({
      url:`${BASE_URL}${url}`,
      method,
      data:body
    })
    setData(response.data);
  } catch (error) {
    setError(error?.response?.data?.mesage || error.mesage);
  }finally{
    setLoading(false)
  }
  }

  return {data,loading,error,sendRequest};
}

export default useApi;


