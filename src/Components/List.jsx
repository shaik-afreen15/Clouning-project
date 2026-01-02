import React from 'react'
import { useState,useEffect } from 'react';
import { fetchData } from '../api/api';
import languagesText from '../api/Language';

const List = ({ titleKey,param ,onMovieClick , lang  }) => {

    const [list, setList] = useState([]);
    useEffect(()=>{
        fetchData(param,lang).then( res=>setList(res.data.results))
    },[param,lang]);
    // console.log(list);
    console.log("lang:", lang);
    console.log("titleKey:", titleKey);
    console.log("text:", languagesText?.[lang]?.[titleKey]);

  return (
    <div className="list">
        <div className="row">
            <h2 className="text-white title">{ languagesText?.[lang]?.[titleKey] || "" }</h2>
            <div className="col">
                <div className="row_posters"> 
                    {
                        list && list.length>0 && list.map( item =>( <img 
                           key={item.id}
                           className="row_poster row_posterLarge" 
                           src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                           alt={item.title}
                           onClick={()=>onMovieClick(item)}
                    /> ))
                    } 
                </div>   
            </div>
        </div>
    </div>
  )
}

export default List
