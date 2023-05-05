import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate, redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import './css_comps/header_nav.css'
import './css_comps/card.css'
import NavBar from './comps/navbar';
import Home from './comps/home';
import About from './comps/about';
import Page404 from './comps/page404';
import SignUpClient from './comps/signup';
import Login from './comps/login';
import Footer from './comps/footer';
import UserInfo from './comps/userInfo';
import ProtectedRoute from './comps/common/protectedRoute';
import { useEffect, useState } from 'react';
import { updateUserData } from './services/userSer';
import FavoriteCards from './comps/favoriteCards';
import MyCards from './comps/biz/myCards';
import AddCard from './comps/addCard';
import EditCard from './comps/editCard';
import { toast } from 'react-toastify';
import { checkIfUser } from './services/authSer';
import { getUserData } from './services/userSer';

function App() {
  let [user,setUser] = useState(null);

  useEffect(() => {
    ifUserLogin()
        
  }, [])

  const ifUserLogin = async() => {
    let data = await updateUserData();
    //console.log(data);
    setUser(data);
  }
  
  return (
    <Router>
       <header className="container-fluid shadow-sm">
        {/* sending via props */}
        { user && <NavBar />}
      </header>
          {/* will show data only after getting the user info */}
      { user &&
      <main className="container" style={{ minHeight: "81vh" }}>
    
        <Routes>
          <Route  exaxt path="/" element={<Home/>} />
          <Route exact path="/:page" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/signup" element={<SignUpClient/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route path="/userInfo"
            element={
          // Good! Do your composition here instead of wrapping <Route>.
          // This is really just inverting the wrapping, but it's a lot
          // more clear which components expect which props.
            <ProtectedRoute redirectTo="/login">
              <UserInfo />
            </ProtectedRoute>
            }
          />
          <Route path="/favorites"
            element={
            <ProtectedRoute redirectTo="/login">
              <FavoriteCards/>
            </ProtectedRoute>
            }
          />
          <Route path="/editCard/:id"
            element={
            <ProtectedRoute redirectTo="/"  isBiz={true}>
              <EditCard  path="/editCard/:id"/>
            </ProtectedRoute>
            }
          />
          <Route path="/myBizCards"
            element={
            <ProtectedRoute redirectTo="/"  isBiz={true}>
              <MyCards path="/myBizCards" />
            </ProtectedRoute>
            }
          />
          <Route path="/addCard"
            element={
            <ProtectedRoute redirectTo="/"  isBiz={true}>
              <AddCard path="/addCard" /> 
            </ProtectedRoute>
            }
          />
          {/*<ProtectedRoute path="/userInfo" comp={UserInfo} />
          <ProtectedRoute path="/favorites" comp={FavoriteCards} />*/}
         {/* bizRoute -> only for bussiness users */}
          <Route path="/*" element={<Page404/>} />
        </Routes>
      </main>
      }
      <footer>
        <Footer />
      </footer>
      <ToastContainer position="bottom-right"/>
    </Router>
  );
}

export default App;
