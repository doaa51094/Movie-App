import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';



export default function () {
  let nanigate=useNavigate();
  const [errorList,setErrorList]=useState([])
  const [isLoding,setLoding]=useState(false)
  const [error ,setError]=useState('')
  const [user,setUser]=useState({
  first_name:'',
  last_name:'',
  age:0,
  email:'',
  password:''
  });

  function getUserData(e){
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser)
   

  }

  async function sendRegisterDataToApi(){
   let {data}= await axios.post(`https://route-movies-api.vercel.app/signup` ,user);
   if(data.message== 'success'){
    setLoding(false)
   
    nanigate('/login')
   }else{
    
    setLoding(false);
    setError(data.message);
  
   
   }
   
  }
  function submitRegisterForm(e){
    setLoding(true)
   e.preventDefault();

 
  let validation= validateRegisterForm();
  if(validation.error){
    setLoding(false);
    setErrorList(validation.error.details);

  }else{
   sendRegisterDataToApi();
  }
 
  }

  function validateRegisterForm(){
   let scheme= Joi.object({
      first_name:Joi.string().min(3).max(10).required(),
      last_name:Joi.string().min(3).max(10).required(),
      age:Joi.number().min(16).max(80).required(),
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
   <form className='py-3' onSubmit={submitRegisterForm}>
    <label htmlFor="first_name">FirstName :</label>
    <input onChange={getUserData} type="text" className='form-control my-2 borderColor' name='first_name' id='first_name'/>
    <p className='text-danger'>{errorList.filter((err)=> err.context.label=='first_name')[0]?.message}</p>
    <label htmlFor="last_name">LastName :</label>
    <input onChange={getUserData} type="text" className='form-control my-2 borderColor' name='last_name' id='last_name'/>
    <p className='text-danger'>{errorList.filter((err)=> err.context.label=='last_name')[0]?.message}</p>
    <label htmlFor="age">Age :</label>
    <input onChange={getUserData} type="number" className='form-control my-2 borderColor' name='age' id='age'/>
    <p className='text-danger'>{errorList.filter((err)=> err.context.label=='age')[0]?.message}</p>
    <label htmlFor="email">Email :</label>
    <input onChange={getUserData} type="email" className='form-control my-2 borderColor' name='email' id='email'/>
    <p className='text-danger'>{errorList.filter((err)=> err.context.label=='email')[0]?.message}</p>
    <label htmlFor="password">Password :</label>
    <input onChange={getUserData} type="password" className='form-control my-2 borderColor mb-3' name='password' id='password'/>
    <p className='text-danger'>{errorList.filter((err)=> err.context.label=='password')[0]?.message}</p>
    <button className='btn btn-info'> {isLoding==true ?<i className='fas fa-spinner fa-spin'></i>:'Register'}</button>
   </form>
   </div>
   
   </>
  )
}
