import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { API_URL, doApiGet, doApiMethod } from '../services/apiSer';


function EditCard(props, state) {
  let [card,setCard] = useState({})

  let { register, handleSubmit, setValue, formState: { errors } } = useForm();
  let history = useNavigate();
  var location = useLocation();

  let nameRef = register("bizName", { required: true, minLength: 2 });
  let descRef = register("bizDescription", { required: true, minLength: 2 });
  let addressRef = register("bizAddress", { required: true, minLength: 2 });
  let phoneRef = register("bizPhone", { required: true, minLength: 2 });
  let imageRef = register("bizImage", { required: false });
  const params = useParams();
  let curstate = location.state;


  useEffect(() => {
    let id = curstate !== null ? curstate.item._id : params.id;
    if (curstate === null) {
      let url = API_URL+"/cards/single/"+id
    doApi(url);
  } else {
    prepareForm(curstate.item);
  }
    
  },[location])

  const prepareForm = (data)=>{
    if (data) {
    // updates inputs
    setValue("bizName",data.bizName);
    setValue("bizDescription",data.bizDescription);
    setValue("bizAddress",data.bizAddress);
    setValue("bizPhone",data.bizPhone);
    setValue("bizImage",data.bizImage);
  } else {
    toast.error("No card found!");
  }
  }

//getting data for inputs
  const doApi = async(url) => { 
    let data = await doApiGet(url);
    setCard(data);
    prepareForm(data);
  }

  const onSubForm = async (dataForm) => {
    try {
      let url = API_URL + "/cards/" + params.id;
      let data = await doApiMethod(url, "PUT", dataForm);
      if (data.n == 1){
        toast.success("Card been update");
        history("/myBizCards");
      }
    }
    catch (err) {
      console.log(err);
      toast.error("There problem, come back next year!");
    }
  }

  return (
    <div>
      <h1>Edit card:</h1>
      <form onSubmit={handleSubmit(onSubForm)} className="row">
        <div className="col-lg-6">
          <label>*Biz name</label>
          <input {...nameRef} type="text" className="form-control mt-2" />
          {errors.bizName &&
            <small className="text-danger">* You must fill your name</small>
          }
        </div>

        <div className="col-lg-6">
          <label>*Biz address</label>
          <input  {...addressRef} type="text" className="form-control mt-2" />
          {errors.bizAddress &&
            <small className="text-danger">* You must Enter valid address</small>
          }
        </div>
        <div className="col-lg-6">
          <label>*Biz phone</label>
          <input   {...phoneRef} type="text" className="form-control mt-2" />
          {errors.bizPhone &&
            <small className="text-danger">* You must Enter valid Phone number</small>
          }
        </div>
        <div className="col-lg-6">
          <label>*Biz image url</label>
          <input  {...imageRef} type="text" className="form-control mt-2" />
          {errors.bizImage &&
            <small className="text-danger">* You must Enter valid url</small>
          }
        </div>
        <div className="col-lg-12">
          <label>*Biz info</label>
          <textarea {...descRef} className="form-control" rows="4"></textarea>
          {errors.bizDescription &&
            <small className="text-danger">* You must enter descrption of biz</small>
          }
        </div>
        <div className="col-12 text-center mb-3">
          <Link to="/myBizCards" className="btn btn-dark mt-4 me-2">Back to list</Link>
          <button className="btn btn-warning  mt-4">Update biz card</button>
        </div>
      </form>
    </div>
  )
}

export default EditCard;