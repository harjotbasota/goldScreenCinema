import React, { useContext,useState } from 'react';
import { MovieContext } from '../context/moviesContext';

const Profile = () => {

  const {accessToken, setAccessToken} = useContext(MovieContext);
  const [userProfile, setUserProfile] = useState('loading...');
  const fetchProfileInfo = async ()=>{
    try{
      const response = await fetch('http://localhost:4000/user/profile');
      const profileInfo = await response.json();
      console.log('profile :', profileInfo.message);
      setUserProfile(profileInfo.message);
    }catch(err){
      console.log(err);
    }
  }
  fetchProfileInfo();
  return (
    <div style={{marginTop:'8vh'}}>
      {userProfile}
    </div>
  )
}

export default Profile

