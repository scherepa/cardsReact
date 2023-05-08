import React, { useEffect, useState } from 'react';
import { Link , useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserData, updateUserData } from '../services/userSer';

function NavBar(props) {
  let [showMobileNav, setShowMobileNav] = useState(false);
  let [user,setUser] = useState(null);
  let history = useNavigate();
  var location = useLocation();


  useEffect(() => {
    setUser(getUserData())
    // props.location -> from route
  },[location])

  // after click in mobile state will be shown nav
  const hideNavMobile = () => {
    setShowMobileNav(false);
  }

  const logOut = async() => {
    // alert("log out");
    localStorage.removeItem("tok");
    // updates that there is no info about user after logout    
    updateUserData();
    history("/login");
    toast.info("You logged out from system !");
    
  }

  return (
    <div className="container nav_top p-2">
      <div className="row align-items-center">
        <div className="logo col-lg-3 d-flex justify-content-between align-items-center">
          <h2 className="text-info">Cards project</h2>
          <div className="burger" onClick={() => {
            setShowMobileNav(!showMobileNav);
          }}>
            <i className="fa fa-bars fs-2" aria-hidden="true"></i>
          </div>
        </div>
        {/* style -> with condition */}
        <nav onClick={hideNavMobile} className={"col-lg-9 text-end"} style={{ display: showMobileNav && "block" }} >
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {!localStorage["tok"] ?
            <React.Fragment>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </React.Fragment>
            :
            <React.Fragment>
              <Link to="/userInfo" state={{ user }}>User info</Link>
              <Link to="/favorites">My Favorites</Link>
        {/* if we write -?- before -.[property]-than even there is no such property it won't show any error */}
            { user?.biz && <Link to="/myBizCards" >My cards</Link> }
              <Link onClick={logOut} to="#" className="text-danger">Log out</Link>
            </React.Fragment>
          }
       
        </nav>
      </div>
    </div>
  )
}

export default NavBar