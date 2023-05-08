import React, { useEffect, useState } from 'react';
import { API_URL, doApiMethod } from '../services/apiSer';
import PageHeader from './common/pageHeader';
import { Navigate, useLocation } from 'react-router-dom';
import {toast} from "react-toastify";
import ContentLoader from 'react-content-loader';

function UserInfo(props){
  let [userInfo, setUserInfo] = useState({});
  let [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state !== null && location.state.user !== null) {
      let userdata = location.state.user;
      userdata.dateCreated = dateAdjusting(userdata.createdAt);
      setUserInfo(userdata);
      setLoading(false);
    } else {
      doApi();
    } 
  },[location])

  const dateAdjusting = (date) => {
   // return date.substr(0,date.indexOf("T"));
   return new Date(date).toDateString();
  }

  const doApi = async() => {
    try{let url = API_URL + "/users/userInfo";
    let data = await doApiMethod(url,"GET");
    if (data) {
      data.dateCreated = dateAdjusting(data.createdAt);
      // data.dateCreated = new Date(userInfo.createdAt).toDateString();
      setUserInfo(data);
      setLoading(false);
    }
  } catch(error) {
  }  
  }

  return(
    <div>
      <PageHeader title="Info about your user:"/>
      
        {loading ? <ContentLoader 
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="67" height="15" /> 
    <rect x="76" y="0" rx="3" ry="3" width="180" height="15" /> 
    <rect x="0" y="30" rx="3" ry="3" width="67" height="15" />
    <rect x="76" y="30" rx="3" ry="3" width="180" height="15" />
    <rect x="0" y="60" rx="3" ry="3" width="67" height="15" />
    <rect x="76" y="60" rx="3" ry="3" width="180" height="15" />
  </ContentLoader>: <div><h4 className="h5">Name: {userInfo.name}</h4>
        <h4 className="h5">Email:    {userInfo.email}</h4>
        <h4 className="h5">From:    {userInfo.dateCreated }</h4></div>}
    </div> 
  )
}

export default UserInfo