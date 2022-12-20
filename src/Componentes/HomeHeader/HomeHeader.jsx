import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import MovieDetails from '../MovieDetails/MovieDetails';
import { Link } from 'react-router-dom';

export default function HomeHeader() {
  const [trendingMovies,setTrendingMovies]=useState([])
 async function getTrendingMovies(){
let {data}= await axios.get(`http://api.themoviedb.org/3/trending/movie/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
setTrendingMovies(data.results);

  }

  useEffect(()=>{ 
    getTrendingMovies();
  } ,[])
 
  var settings = {
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };
  
  return (
    <>
  
    <section id='homeHeader' className='d-lg-flex d-none justify-content-center align-items-end '>
   <div className='container'>
    <div className="row">
    <div className='.col-lg-12 '>
    <p className='fs-3 fw-bolder lead'>Our Lastes Movies</p>
   <Slider {...settings}>
   {trendingMovies.slice(0,15).map((movie , index)=>
    <Link to={'/movieDetails/'+movie.id+'/'+movie.media_type}  key={index} >
      <div className='slider_item '>
       <img src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} className='w-100 rounded' alt=""/>
      </div> 
    </Link>
     )}
      
    </Slider>
   </div>
    </div>
  
   </div>
    </section>
    </>
  )
}
