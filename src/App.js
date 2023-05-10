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
import NotLogedInOnlY from './comps/common/NotLogedInOnly';

function App() {
  let [user,setUser] = useState(null);

  useEffect(() => {
    ifUserLogin()
        
  }, [])

  const ifUserLogin = async() => {
    let data = await updateUserData();
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
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/login"
            element={
            <NotLogedInOnlY redirectTo="/">
              <Login/>
            </NotLogedInOnlY>
            }
          />
          <Route exact path="/signup"
            element={
            <NotLogedInOnlY redirectTo="/">
              <SignUpClient/>
            </NotLogedInOnlY>
            }
          />
          <Route exact path="/userInfo"
            element={
            <ProtectedRoute redirectTo="/login">
              <UserInfo />
            </ProtectedRoute>
            }
          />
          <Route exact path="/favorites"
            element={
            <ProtectedRoute redirectTo="/login">
              <FavoriteCards/>
            </ProtectedRoute>
            }
          />
          <Route exact path="/editCard/:id"
            element={
            <ProtectedRoute redirectTo="/"  isBiz={true}>
              <EditCard  path="/editCard/:id"/>
            </ProtectedRoute>
            }
          />
          <Route exact path="/myBizCards"
            element={
            <ProtectedRoute redirectTo="/"  isBiz={true}>
              <MyCards path="/myBizCards" />
            </ProtectedRoute>
            }
          />
          <Route exact path="/addCard"
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
