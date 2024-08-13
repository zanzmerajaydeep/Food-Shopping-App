import React, { useEffect, useState } from 'react'
import {  useNavigate} from "react-router-dom";

export const Home = () => {
  //code for login======================================
  const navigate = useNavigate();
  const userdata=JSON.parse(localStorage.getItem('userData'));

  useEffect((e)=>{
    alert("status = "+userdata.username)
    if(userdata.username == null)
    {
      navigate("/Login");
    }
  },userdata);
  //===========================================================================
  
  return (
    <>
    <div>Home</div>
   
    {JSON.stringify(userdata)}
    {userdata.role}
    </>
  )
}
