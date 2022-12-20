import React from 'react'
import Navbar from '../Navbar/Navbar'
import {Outlet, useNavigate} from 'react-router-dom'

export default function Layout({userData,setUserData}) {
  let navigate=useNavigate();
  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/')
  }
  return (
    <>
   <Navbar userData={userData} logOut={logOut}/>
  
   <Outlet></Outlet>
 
   
    
    </>
  )
}
