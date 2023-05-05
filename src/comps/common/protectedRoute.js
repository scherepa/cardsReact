import React, { useEffect } from 'react';
import { Route, useNavigate, Routes, Navigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { checkIfUser } from '../../services/authSer';
import { getUserData } from '../../services/userSer';

function ProtectedRoute({ children, redirectTo, isBiz = false}) {
  let history = useNavigate();


  const checkTokenUser = async () => {
    let data = await checkIfUser()
    console.log(data);
    console.log('protected');
    console.log(window.location.pathname);
    console.log(localStorage["tok"]);
  
    // check if this is bussiness route
    if(isBiz){
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
      toast.error("There problem, log in again");
      // למחוק את הטוקן אם הוא לא תקין
      localStorage.removeItem("tok");
      history("/login");
      return false;
    } 
    return true;
  }

  return checkTokenUser() ? children : <Navigate to={redirectTo} replace/>
}

export default ProtectedRoute;