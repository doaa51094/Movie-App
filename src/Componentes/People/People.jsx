
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import MediaItem from '../MediaItem/MediaItem';

export default function People() {
  let pageList=new Array(10).fill('').map((i,ele)=> ele+1)
  const [trendingPerson,setTrendingPerson]=useState([])
 async function getTrending(pageNumber){
  let {data}= await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&page=${pageNumber}`)
  setTrendingPerson(data.results);
  
    }
    async function search(e){
      if(e.target.value){
        let {data}= await axios.get(`https://api.themoviedb.org/3/search/person?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&page=1&include_adult=false&query=${e.target.value}`)
        setTrendingPerson(data.results);
      }else{
        getTrending(1);
      }
            }
  
  
    useEffect(()=>{ 
      getTrending(1);
    } ,[])

    function onPaginate(page){
      getTrending(page);
    }
  return (
    <>
     <div className="container">
     <div className="row mt-4 gy-4">
     <input onChange={search} type="text" placeholder='Search....' className='form-control bg-dark text-light mb-3'/>
      {trendingPerson.slice(0,18).map((movie , index)=> <MediaItem movie={movie} key={index}/>  )}
      <nav aria-label="Page navigation example" className='pt-5'>
  <ul className="pagination  d-flex justify-content-center">
   
   {pageList.map((ele,i)=><li className="page-item" key={i} onClick={()=> onPaginate(ele) }><a className="page-link" >{ele}</a></li>)}
    
  </ul>
</nav>
    </div>
     </div>
    
    
    
    </>
  )
}
