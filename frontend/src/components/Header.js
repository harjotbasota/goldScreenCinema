import React, { useRef, useState , useEffect } from 'react';
import '../styles/Header.css';
import Home from '@mui/icons-material/Home';
import ShowTime from '@mui/icons-material/EventAvailable';
import Cinema from '@mui/icons-material/Movie';
import AboutUs from '@mui/icons-material/Apartment';
import Search from '@mui/icons-material/Search';
import Location from '@mui/icons-material/MyLocation';
import Profile from '@mui/icons-material/Person';
import DownArror from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import { Button} from '@mui/material';
import { Link } from 'react-router-dom';


const Header = () => {
  const [displaySearchBox, setDisplaySearchBox ] = useState(false);
  const [displaySearchIcon, setDisplaySearchIcon] = useState(true);
  const [displayLocationIcon, setDisplayLocationIcon] = useState(true);
  const [displayProfileIcon, setDisplayProfileIcon] = useState(true);
  const [displayMenuIcon, setDisplayMenuIcon] = useState(true);
  const [displayMenuContent, setDisplayMenuContent] = useState(false);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const searchInputRef = useRef(null);

  const handleSearchIconClick = () =>{
    setDisplaySearchBox(!displaySearchBox);
    setDisplayLocationIcon(!displayLocationIcon);
    setDisplayMenuIcon(!displayMenuIcon);
    setDisplayProfileIcon(!displayProfileIcon);
  }

  const handleDisplayMenuContent = () =>{
    setDisplayMenuContent(!displayMenuContent);
    setDisplayMenuIcon(!displayMenuIcon);
    setDisplaySearchIcon(!displaySearchIcon);
  }
  useEffect(() => {
    if (displaySearchBox) {
      searchInputRef.current.focus();
    }
  }, [displaySearchBox]);

  return (
    <div className='headerContainer'>
      <div className='logo'>
        <img src='/images/logo.png'></img>
        <p> GS Cinema</p>
      </div>

      <div className='navbar'>        
        <div className={`navOption ${currentPageIdx == 0 ? 'activePage' : ''}`} onClick={()=>setCurrentPageIdx(0)}> <Link to ='/' > <Home /> <span > Home </span></Link> </div>       
        <div className={`navOption ${currentPageIdx == 1 ? 'activePage' : ''}`} onClick={()=>setCurrentPageIdx(1)}> <Link to ='/shows' > <ShowTime /> <span >  Show Timings </span> </Link> </div>        
        <div className={`navOption ${currentPageIdx == 2 ? 'activePage' : ''}`} onClick={()=>setCurrentPageIdx(2)}> <Link to ='/cinemas' > <Cinema /> <span >  Cinemas </span> </Link> </div>
        <div className={`navOption ${currentPageIdx == 3 ? 'activePage' : ''}`} onClick={()=>setCurrentPageIdx(3)}> <Link to ='/about' > <AboutUs /> <span >  About Us </span></Link> </div>
      </div>

      <div className='navRight'>
        <div className='searchIcon' style={displaySearchIcon ? {} : {display:'none'}}>
        <input className='searchBox' ref={searchInputRef} placeholder='Search movies and Cinemas'  style={{display: displaySearchBox?'flex':'none'}}></input>
        <Button className='searchButton' onClick={handleSearchIconClick} > <Search /> </Button> 
        </div>
        <div className='Location'style={displayLocationIcon ? {}: {display:'none'}}>
            <Button> <Location /> <span> Chandigarh</span> <DownArror /> </Button>
        </div>
        <div className='profile' style={displayProfileIcon ? {} : {display: 'none'}}>
            <Button> <Profile />  <span> Profile </span>  </Button>
        </div>
      </div>
      <div className='smallScreens'>
          <div className='menu' onClick={handleDisplayMenuContent} style={displayMenuIcon ? {} : {display: 'none'}}>
            <Button>  <Menu />  </Button>
          </div>  
          <ul className='menuItems' style={displayMenuContent? {display:'block'} : {} }>
            <li className='menuItem'> <div className='close' style={displayMenuContent? {display:'flex'} : {} } onClick={handleDisplayMenuContent}>
            <Button>  <Close />  </Button>
          </div> </li> 
            <li className='menuItem' onClick={handleDisplayMenuContent}> <Link to ='/' > <Home /> <span > Home </span></Link> </li>       
            <li className='menuItem' onClick={handleDisplayMenuContent}> <Link to ='/shows' > <ShowTime /> <span >  Shows </span> </Link> </li>        
            <li className='menuItem' onClick={handleDisplayMenuContent}> <Link to ='/cinemas' > <Cinema /> <span >  Cinemas </span> </Link> </li>
            <li className='menuItem' onClick={handleDisplayMenuContent}> <Link to ='/about' > <AboutUs /> <span >  About Us </span></Link> </li>
            <li className='menuItem' onClick={handleDisplayMenuContent}> <Link to ='#' > <Location /> <span >  Location </span></Link> </li>
            <li className='menuItem' onClick={handleDisplayMenuContent}> <Link to ='#' > <Profile /> <span >  Profile </span></Link> </li>
          </ul>    
      </div>
    
    </div>
  )
}

export default Header
