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
import Menu from '@mui/icons-material/Menu';
import { Button} from '@mui/material';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className='headerContainer'>
      <div className='logo'>
        <img src={logoImage}></img>
        <p> GS Cinema</p>
      </div>

      <div className='navbar'>        
        <div className='navOption'> <Link to ='/' > <Home /> <span > Home </span></Link> </div>       
        <div className='navOption'> <Link to ='/shows' > <ShowTime /> <span >  Show Timings </span> </Link> </div>        
        <div className='navOption'> <Link to ='/cinemas' > <Cinema /> <span >  Cinemas </span> </Link> </div>
        <div className='navOption'> <Link to ='/about' > <AboutUs /> <span >  About Us </span></Link> </div>
      </div>

      <div className='navRight'>
        <div className='searchIcon'>
            <Button> <Search /> </Button>
        </div>
        <div className='Location'>
            <Button> <Location /> <span> Chandigarh</span> <DownArror /> </Button>
        </div>
        <div className='profile'>
            <Button> <Profile />  <span> Profile </span>  </Button>
        </div>
      </div>
      <div className='menu'>
        <Menu />
      </div>      
    
    </div>
  )
}

export default Header
