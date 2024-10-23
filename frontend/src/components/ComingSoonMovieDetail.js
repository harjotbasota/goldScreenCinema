import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ComingSoonMovieDetail.css'

const ComingSoonMovieDetail = () => {
    const location = useLocation();
    const comingSoonMovie = location.state.comingSoonMovie;
    console.log(comingSoonMovie);
  return (
    <div className='comingSoonMovieDetailPage'>
      <div className='comingSoonMovieContainer'>
        <div className='containerLeftSide'>
          <span className='title'>{comingSoonMovie.title} </span>
          <p className='infoHeader'style={{color:'red'}}> COMING SOON --- COMING SOON --- COMING SOON</p>
          <p className='infoHeader'> Description: <span className='info'>{comingSoonMovie.description}</span>  </p> 
          <p className='infoHeader'> Genre:  <span className='info'>{comingSoonMovie.genre}</span>   </p> 
          <p className='infoHeader'> Release Date:  <span className='info'>{comingSoonMovie.release_date}</span>  </p>
          <p className='infoHeader2'> Cast</p> 
          {comingSoonMovie.cast.map((person)=>{
            return <p className='person'> {person} </p>
          })}
        </div>
        <div className='containerRightSide'>
                <img src={comingSoonMovie.poster} />
        </div>
      </div>
    </div>
  )
}

export default ComingSoonMovieDetail
