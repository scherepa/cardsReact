import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { checkIfUser } from '../../services/authSer';
import { toast } from 'react-toastify';

function NotLogedInOnlY({children, redirectTo}) {
    let history = useNavigate();

    const checkTok =  async () => {
    let data = await checkIfUser();
    //if everything ok we getting status otherwise:
    if (!data || !data.status) {
      if ( localStorage["tok"]) {
        localStorage.removeItem("tok");
      }
      return true;
    } 
    toast.error('you are logged in...');
    history('/');
    return false;
  }
    return checkTok() ? children : <Navigate to={redirectTo} replace={true}/>
}

export default NotLogedInOnlY