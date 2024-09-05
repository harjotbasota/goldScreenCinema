import React from 'react';
import '../styles/Header.css';
import logoImage from '../images/logo.png';
import Home from '@mui/icons-material/Home';
import ShowTime from '@mui/icons-material/EventAvailable';
import Cinema from '@mui/icons-material/Movie';
import AboutUs from '@mui/icons-material/Apartment';
import Search from '@mui/icons-material/Search';
import Location from '@mui/icons-material/MyLocation';
import Profile from '@mui/icons-material/Person';
import DownArror from '@mui/icons-material/ArrowDropDown';


const Header = () => {
  return (
    <div className='headerContainer'>
      <div className='logo'>
        <img src={logoImage}></img>
        <p> GoldScreen Cinema</p>
      </div>

      <div className='navbar'>
        <div className='navIcon'> <Home /> </div>
        <div className='navOption'> Home </div>
        <div className='navIcon'> <ShowTime /> </div>
        <div className='navOption'> Show Times </div>
        <div className='navIcon'> <Cinema /> </div>
        <div className='navOption'> Cinema </div>
        <div className='navIcon'> <AboutUs /> </div>
        <div className='navOption'> About Us </div>
      </div>

      <div className='navRight'>
        <div className='searchIcon'>
            <Search />
        </div>
        <div className='Location'>
            <Location /> <span> Chandigarh</span> <DownArror />
        </div>
        <div className='profile'>
            <Profile />  <span> Profile </span> 
        </div>
      </div>
    
    </div>
  )
}

export default Header
