import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, doApiMethod } from '../../services/apiSer';
import PageHeader from '../common/pageHeader';
import {toast} from 'react-toastify';

function MyCards(props) {
  let [ar, setAr] = useState([]);
  let [loading, setLoading] = useState(true);
  const delCard = async(_id) => {
    if(window.confirm("Are you sure you want to del?")){
      let url = API_URL+ "/cards/"+_id;
      let data = await doApiMethod(url,"DELETE");
      if(data.n == 1){
        doApi();
        toast.info("Card deleted forever!!!!!!");
      }
    }
  }
  //Api call
  useEffect(() => {
    doApi();
  }, [props.location])

  const doApi = async () => {
    try {
      let url = API_URL + "/cards/userCardsAdded?perPage=999";
      let data = await doApiMethod(url, "GET");
      data.reverse();
      setAr(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response && error.response.data ? error.response.data.msg : error.message);
    }
  }

  return (
    <div className="container">
      <PageHeader title="Biz cards you added before:" />
      {loading ? <Link className="btn btn-outline-success disabled" to="#">Add new biz card</Link>
      :
      <Link className="btn btn-outline-success" to="/addCard">Add new biz card</Link>
      }
      <div className="table-responsive">
        <table className="table table-striped table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Descrption</th>
              <th>Address</th>
              <th>Phone</th>
              <th>edit/del</th>

            </tr>
          </thead>
          <tbody>
            {loading ? <tr>
                  <td className="text-info">
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "100%", backgroundColor: `#DADADA`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                  </td>
                  <td>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "100%", backgroundColor: `#DADADA`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                  </td>
                  <td>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "100%", backgroundColor: `#DADADA`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                  </td>
                  <td>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "100%", backgroundColor: `#DADADA`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                  </td>
                  <td>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "100%", backgroundColor: `#DADADA`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                  </td>
                  <td className="d-flex flex-column flex-md-row">
                    <Link to='#' className="btn btn-outline-warning m-2 disabled" style={{width:"60px"}}>edit</Link>
                    <button  className="btn btn-outline-danger m-2 disabled"  style={{width:"60px"}}>del</button>
                  </td>
                </tr> : ar.map((item, i) => {
              return (
                <tr key={i}>
                  <td className="text-info">{i+1}</td>
                  <td>{item.bizName}</td>
                  <td>{item.bizDescription.substr(0,40)}...</td>
                  <td>{item.bizAddress}</td>
                  <td>{item.bizPhone}</td>
                  <td className="d-flex flex-column flex-md-row">
                    <Link to={"/editCard/"+item._id} state={{ item }} className="btn btn-outline-warning m-2" style={{width:"60px"}}>edit</Link>
                    <button  className="btn btn-outline-danger m-2" onClick={() => {delCard(item._id);}}  style={{width:"60px"}} disabled={{loading}}>del</button>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyCards