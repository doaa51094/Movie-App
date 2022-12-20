import React from 'react'
import { Link } from 'react-router-dom'

export default function MediaItem({movie}) {
  return (
    <>
     <div  className="col-md-3 col-lg-2  item3">
    <Link to={'/movieDetails/'+movie.id+'/'+movie.media_type}>
    <div className="movie position-relative  pb-1">
        {movie.poster_path?<img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt="" />:''}
        {movie.profile_path?<img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.profile_path} alt="" />:''}
        {movie.vote_average?<div className="rate">{movie.vote_average?.toFixed(1)}</div>:''}   
      <h3 className='h6 my-2 px-1'>{movie.title}{movie.name}</h3> 
    </div>
    </Link>
    </div>
    </>
  )
}
