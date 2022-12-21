import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem'
import HomeHeader from '../HomeHeader/HomeHeader';

export default function Home() {
const [trendingMovies,setTrendingMovies]=useState([])
const [trendingTv,setTrendingTv]=useState([])
const [trendingPerson,setTrendingPerson]=useState([])


 async function getTrending(mediaType ,fun){
let {data}= await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff`)
fun(data.results);

  }

  useEffect(()=>{ 
    getTrending('tv' ,setTrendingTv);
    getTrending('person' ,setTrendingPerson);
    getTrending('movie' ,setTrendingMovies);
  } ,[])
  return (
    <>
        <HomeHeader/>    
   <div className="container">
   <div className="row mt-4 gy-4">
      <div className=" col-md-4 px-4">
        <div className='brdr w-25 mp-3'></div>
        <h2 className='pt-2'>Trending <br/> movies <br/> To Watch Right Now</h2>
        <p className='text-muted py-3'>Most watched Movies by Days</p>
        <div className='brdr w-100 mt-3'></div>
      </div>
      {trendingMovies.splice(0,10).map((movie , index)=> <MediaItem movie={movie} key={index}/>  )}
      
    </div>

    
    <div className="row mt-4 gy-4">
      <div className="col-md-4 px-4 ">
        <div className='brdr w-25 mp-3'></div>
        <h2 className='pt-2'>Trending <br/> tv <br/> To Watch Right Now</h2>
        <p className='text-muted py-3'>Most watched Movies by Days</p>
        <div className='brdr w-100 mt-3'></div>
      </div>
      {trendingTv.splice(0,10).map((movie , index)=> <MediaItem movie={movie} key={index}/>  )}
      
    </div>

    <div className="row mt-4 gy-4">
      <div className="col-md-4 px-4 ">
        <div className='brdr w-25 mp-3'></div>
        <h2 className='pt-2'>Trending <br/> people <br/> To Watch Right Now</h2>
        <p className='text-muted py-3'>Most watched Movies by Days</p>
        <div className='brdr w-100 mt-3'></div>
      </div>
      {trendingPerson.splice(0,10).map((movie , index)=> <MediaItem movie={movie} key={index}/>  )}
      
    </div>
   </div>



   
  
    
    
    </>


  )
}
