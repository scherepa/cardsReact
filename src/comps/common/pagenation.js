import React, { useEffect, useState } from 'react';
import { Link, NavLink, Navigate } from 'react-router-dom';
import { API_URL, doApiGet, PER_PAGE } from '../../services/apiSer';

function Pagenation(props){
  let [countPage,setCountPage] = useState(0);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    doApi();
  },[])


  const doApi = async() => {
    let url = API_URL+props.urlOfItemNum;
    let data = await doApiGet(url);
    if (data) {
      // getting number of pages   
      setCountPage(Math.ceil(data.count / PER_PAGE));
      setLoading(false);
    }
  }

  return(
    <div>
      {/* maping "virtual" array of length countPage*/}
       {loading ? 
       <div className="row row-cols-6 w-50">
        <div className="col p-2">
          <div className="rounded-circle p-2" style={{width: "20%",backgroundColor: `#DADADA`}}></div>
        </div>
        <div className="col col py-2">
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "100%", backgroundColor: `#DADADA`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            </div>
          </div>
        </div>
        <div className="col p-2">
          <div className="rounded-circle p-2" style={{width: "20%",backgroundColor: `#DADADA`}}></div>
        </div>
        <div className="col col py-2">
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "100%", backgroundColor: `#DADADA`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            </div>
          </div>
        </div>
        <div className="col p-2">
          <div className="rounded-circle p-2" style={{width: "20%",backgroundColor: `#DADADA`}}></div>
        </div>
        <div className="col col py-2">
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "100%", backgroundColor: `#DADADA`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            </div>
          </div>
        </div>
       </div> :
       [...Array(countPage)].map((item,i) => {
         return(
        <Link key={i} to={props.linkTo+(i+1)} className="btn btn-outline-dark me-1 text-info">{i + 1}</Link>
         )
       }) }
    </div> 
  )
}

export default Pagenation