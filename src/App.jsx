
import { useEffect } from 'react';
import './App.css'
import Home from './components/Home'
import { useMyContext } from './context/useMyContext'

import useApi from '../hooks/infoStudent';
import UpdateStudent from './components/UpdateStudent';
import { Outlet } from "react-router";
import { Bounce, ToastContainer } from 'react-toastify';


function App() {

  const { setValue }= useMyContext();
  const {sendRequest}=useApi();

  const handleGlobalState=async ()=>{
    try {
      const response=await sendRequest({ url: "getAll", method: "GET" }) 
            // console.log("The Response",response)
      setValue(response)
      
    } catch (error) {
       console.error("API Error:", error);
    }

  }

  useEffect(()=>{
    handleGlobalState()
  },[])
  
//   useEffect(()=>{
// console.log("the value:",value)
//   },[value])


  return (
    <>
   <Outlet/>
   <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>
    </>
  )
}

export default App
