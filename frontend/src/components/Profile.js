import React, { useContext,useEffect,useState } from 'react';
import { MovieContext } from '../context/moviesContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {

  const {accessToken, setAccessToken,movies,cinemas} = useContext(MovieContext);
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();
  console.log('movies: ',movies);
  console.log('cinemas: ',cinemas);

  const fetchProfileInfo = async ()=>{
    try{
      const response = await fetch('http://192.168.2.38:4000/user/profile',{
        headers:{'Content-Type':'application/json','Authorization': `Bearer ${accessToken}`},
        method:'GET',
        credentials:'include'
      });
      const profileInfo = await response.json();
      console.log(profileInfo);
      console.log('status code:',response.status)
      if(response.ok){
        setUserProfile(profileInfo.message);
        if(response.headers.get('Authorization')){
          setAccessToken(response.headers.get('Authorization').split(' ')[1])}
        }else{
        navigate('/login');
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchProfileInfo();
    console.log('intial user profile:',userProfile);
    console.log('length of user',Object.keys(userProfile).length)
  },[])
  
  return (
    Object.keys(userProfile).length == 0 || movies == undefined || cinemas == undefined ? 
      <div className='profilePage'>loading...</div> :

        <div className='profilePage'>
          <div className='userInfoContainer'>
              <h1>Welcome, {userProfile.username} </h1>
              <button>Logout</button>
          </div>
          <div className='bookedShowsContainer'>
              { userProfile.bookedShows.length == 0 ? 
                  <div>You dont have any tickets</div> :
                    userProfile.bookedShows.map((show)=>{
                      return <div className='bookedShows'>
                          <h1>Gold Screen Cinema</h1>
                          <h2>{show.bookedSeats.length} Movie Ticket(s)</h2>
                          <p>Movie :{movies[show.movieID].title }</p>
                          <p>Theater: {cinemas[show.cinemaID - 1].name + ',' + cinemas[show.cinemaID - 1].location}</p>
                          <p>Show: {show.showDate} @ {show.showTime}</p>
                          <p>Seats:                   
                          { 
                            show.bookedSeats.map((seat)=>{
                              return <> {seat} </>
                          })} </p>
                        </div>
                })
              }
          </div>
        </div>
  )
}

export default Profile

