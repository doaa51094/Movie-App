
import {createHashRouter,RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Componentes/Layout/Layout';
import Home from './Componentes/Home/Home';
import People from './Componentes/People/People';
import Tv from './Componentes/Tv/Tv';
import Login from './Componentes/Login/Login';
import Movies from './Componentes/Movies/Movies';
import Register from './Componentes/Register/Register';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import Profile from './Componentes/Profile/Profile';
import MovieDetails from './Componentes/MovieDetails/MovieDetails';
import { useEffect } from 'react';
import ProtectedRoute from './Componentes/ProtectedRoute/ProtectedRoute';



function App() {

useEffect(()=>{
  if(localStorage.getItem('userToken')!==null ){
    saveUserData();
  }
},[])

 const [userData, setUserData]=useState(null);
 function saveUserData(){
 let encodedToken=localStorage.getItem('userToken');
 let decodedToken=jwtDecode(encodedToken);
 setUserData(decodedToken);
  }
  
let routers=createHashRouter([
  { path:'/' ,element:<Layout userData={userData} setUserData={setUserData}/> ,children:[
    {path:'home' ,element:<ProtectedRoute userData={userData}><Home/></ProtectedRoute>},
    {path:'movies' ,element: <ProtectedRoute><Movies/></ProtectedRoute>},
    {path:'people' ,element:<ProtectedRoute><People/></ProtectedRoute> },
    {path:'tv' ,element:<ProtectedRoute><Tv/></ProtectedRoute> },
    {path:'login' ,element:<Login saveUserData={saveUserData}/>},
    {path:'profile' ,element:<ProtectedRoute><Profile userData={userData}/></ProtectedRoute> },
    {path:'movieDetails/:id/:media_type' ,element: <ProtectedRoute><MovieDetails/></ProtectedRoute>},
    {index:true ,element:<Register/>}

  ]}
])
  return <RouterProvider router={routers}/>
}

export default App;
