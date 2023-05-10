import React, { useEffect } from 'react';
import { Route, useNavigate, Routes, Navigate, Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { checkIfUser } from '../../services/authSer';
import { getUserData } from '../../services/userSer';

function ProtectedRoute({ children, redirectTo, isBiz = false}) {
  let history = useNavigate();
  let location = useLocation();


  const checkTokenUser = async () => {
    let data = await checkIfUser()
  
    // check if this is bussiness route
    if(localStorage["tok"] && isBiz){
      // getting data from service to check afterwards if this user is biz
      let user = getUserData();
      // checking if this user is biz
      if(!user.biz){
        toast.warning("You must be business");
        history("/");
        return false;
      }
    }
    
    //if everything ok we getting status otherwise:
    if (!data.status) {
      if ( localStorage["tok"]) {
        toast.error("There problem, log in again");
        localStorage.removeItem("tok");
      }
      history("/login");
      return false;
    } 
    return true;
  }

  return checkTokenUser() ? children : <Navigate to={redirectTo} replace/>
}

export default ProtectedRoute;