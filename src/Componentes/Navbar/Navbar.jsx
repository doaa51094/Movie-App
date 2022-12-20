import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar({userData,logOut}) {
  return (
    <>
    <nav className="navbar navbar-expand-lg shadow  navbar-dark">
  <div className="container-fluid">
       <h1 className='px-5 noxe'>Noxe</h1>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <div>
      {userData?<ul className="navbar-nav ">
        <li className="nav-item">
          <Link className="nav-link active" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="tv">Tv show</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="people">People</Link>
        </li>

       
      </ul>:''}
      </div>
{userData? <h3 className='userName text-center w-50 d-lg-block d-none'>Hello {userData.first_name}</h3> :''}
      
<div className='d-flex align-items-center ms-auto '>
  
    <div className=' d-lg-block d-none'>
    <i className='fab mx-1 fa-facebook'></i>
    <i className='fab mx-1 fa-instgram'></i>
    <i className='fab mx-1 fa-youtube'></i>
    <i className='fab mx-1 fa-spotify'></i>
    <i className='fab mx-1 fa-twitter'></i>
    </div>
    <ul className="navbar-nav">

      {userData?<>
        <li className="nav-item">
          <Link className="nav-link active"  to="profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active"  to="" onClick={logOut}>LogOut</Link>
        </li>
        </> :<>
       <li className="nav-item">
          <Link className="nav-link active"  to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active"  to="">Register</Link>
        </li>
       </>}
       
      </ul>
</div>
    </div>
    
  </div>
</nav>
    
    
    
    </>
  )
}
