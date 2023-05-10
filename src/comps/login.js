import React, { useEffect, useState } from 'react';
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import { API_URL, doApiMethod } from '../services/apiSer';
import {useNavigate} from "react-router-dom"
import PageHeader from './common/pageHeader';
import { updateUserData} from '../services/userSer';


function Login(props){
  let [showBar, setShowBar] = useState(true);

  let {register , handleSubmit ,  formState: { errors } } = useForm();
  let history = useNavigate();
  // register -> ref= useRef()
  let emailRef = register("email",{
    required:true,  
    pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })

  let passwordRef =  register("password",{required:true, minLength:3});

  useEffect(() => {
    setShowBar(false);
  }, [register]);

  const onSubForm = async(formData) => {
    try{
      setShowBar(true)
      let url = API_URL+"/users/login";
      let data = await doApiMethod(url,"POST",formData);
      // after getting token we saving it to the localstorage
      localStorage.setItem("tok",data.token);
      // updates user data to be able to get it with service
      await updateUserData();
      // toast("You logged in , good for you!11");
      toast.success("You logged in !");
      history("/userInfo");
      setShowBar(false);
    }
    catch(err){
      console.log(err);
      setShowBar(false);
      toast.error("User or password worng!");
    }
  }
  return (<div className="container">
    {showBar ?  <div className="progress col-lg-6 mx-auto mt-4">
                  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "100%", backgroundColor: `#DADADA`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                  </div>
                </div>
                    :
    <form onSubmit={handleSubmit(onSubForm)} className="col-lg-6 mx-auto shadow p-3 rounded mt-3">
      <PageHeader title="Log in" />
      <div>
        <label>Email:</label>
        <input {...emailRef} type="text" className="form-control" />
        {errors.email && <span className="text-danger">Enter valid email</span>}
      </div>
      <div>
        <label>Password:</label>
        <input {...passwordRef} type="password" className="form-control" />
        {errors.password && <span className="text-danger">Enter min 3 charts password</span>}
      </div>
     
      <button className="btn btn-success mt-3">Log in</button>
    </form>
}
  </div>)
}

export default Login