import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

 

export default function MovieDetails() {
    let params=useParams();
    const [itemDetails,setItemDetails]=useState([])
    

async function getItemDetails(){
let {data}= await axios.get(`https://api.themoviedb.org/3/${params.media_type}/${params.id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
 setItemDetails(data);

}
    useEffect(() =>{
        getItemDetails()
    } , [])
  return (
    <>
   <section>
   <div className="container">
    <div className="row py-4">
        <div className="col-md-3">
        {itemDetails.poster_path?<img className='w-100' src={'https://image.tmdb.org/t/p/w500'+itemDetails.poster_path} alt="" />:''}
        {itemDetails.profile_path?<img className='w-100' src={'https://image.tmdb.org/t/p/w500'+itemDetails.profile_path} alt="" />:''}
        </div>
        <div className="col-md-9 pt-3">
            <h2>{itemDetails.title}{itemDetails.name}</h2>
            <p className='text-muted pt-2'>{itemDetails.overview}{itemDetails.biography}</p>
            <ul className='list-unstyled d-flex flex-wrap'>
                {itemDetails.known_for_department?<li className='bg-info p-2 rounded'>{itemDetails.known_for_department}</li>:''}
                {itemDetails.genres?.map((genre,i)=> <li className='bg-info p-2 rounded m-1' key={i}>{genre.name}</li>)}
      
            </ul>
            {itemDetails.place_of_birth?<h4 className='text-muted'>place of birth : {itemDetails.place_of_birth}</h4>:''}
            {itemDetails.vote_average?<h4 className='text-muted'>Vote : {itemDetails.vote_average?.toFixed(1)}</h4>:''}
            {itemDetails.vote_count? <h4 className='text-muted'>Vote count : {itemDetails.vote_count}</h4>:''}
            <h4 className='text-muted'>popularity : {itemDetails.popularity}</h4>
            {itemDetails.release_date?<h4 className='text-muted'>release date : {itemDetails.release_date}</h4>:''}
            {itemDetails.first_air_date?<h4 className='text-muted'>release date : {itemDetails.first_air_date}</h4>:''}
            
        </div>
    </div>
    </div>
   </section>
   



</>
  )
}
