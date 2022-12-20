import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';


export default function Login({saveUserData}) {
  let nanigate=useNavigate();
  const [errorList,setErrorList]=useState([])
  const [isLoding,setLoding]=useState(false)
  const [error ,setError]=useState('')
  const [user,setUser]=useState({
  email:'',
  password:''
  });

  function getUserData(e){
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser)
   

  }

  async function sendLoginDataToApi(){
   let {data}= await axios.post(`https://route-movies-api.vercel.app/signin` ,user);
   if(data.message== 'success'){
    setLoding(false)
    localStorage.setItem('userToken' ,data.token)
    // log|home
    saveUserData();
    nanigate('/home')
   }else{
    // error
    setLoding(false);
    setError(data.message);
  
   
   }
  
  }
  function submitLoginForm(e){
    setLoding(true)
   e.preventDefault();

 
  let validation= validateLoginForm();
  if(validation.error){
    setLoding(false);
    setErrorList(validation.error.details);

  }else{
   sendLoginDataToApi();
  }
 
  }

  function validateLoginForm(){
   let scheme= Joi.object({
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        'string.pattern.base':'invalid password'
      })
    })
   return scheme.validate(user ,{abortEarly:false});
  
  }
  return (
  <>
  {error.length>0 ?<div className="alert  alert-danger my-2">{error}</div>:''}
  <div className="container">
  <form className='py-3' onSubmit={submitLoginForm}>
    <label htmlFor="email">Email :</label>
    <input onChange={getUserData} type="email" className='form-control my-2 borderColor' name='email' id='email'/>
    <p className='text-danger'>{errorList.filter((err)=> err.context.label=='email')[0]?.message}</p>
    <label htmlFor="password">Password :</label>
    <input onChange={getUserData} type="password" className='form-control my-2 borderColor mb-3' name='password' id='password'/>
    <p className='text-danger'>{errorList.filter((err)=> err.context.label=='password')[0]?.message}</p>
    <button className='btn btn-info'> {isLoding==true ?<i className='fas fa-spinner fa-spin'></i>:'Login'}</button>
   </form>
  </div>
  </>
  )
}
