import React, { useRef, useState , useEffect, useContext } from 'react';
import '../styles/Header.css';
import Home from '@mui/icons-material/Home';
import ShowTime from '@mui/icons-material/EventAvailable';
import Cinema from '@mui/icons-material/Movie';
import AboutUs from '@mui/icons-material/Apartment';
import Search from '@mui/icons-material/Search';
import Location from '@mui/icons-material/MyLocation';
import Profile from '@mui/icons-material/Person';
import Switch from '@mui/icons-material/SwitchLeft';
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import { Button} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { MovieContext } from '../context/moviesContext';

const useClickOutsideDiv = (ref, handleClose) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handleClose]);
};

const Header = () => {
  const [displaySearchBox, setDisplaySearchBox ] = useState(false);
  const [displaySearchIcon, setDisplaySearchIcon] = useState(true);
  const [displayLocationIcon, setDisplayLocationIcon] = useState(true);
  const [displayProfileIcon, setDisplayProfileIcon] = useState(true);
  const [displayMenuIcon, setDisplayMenuIcon] = useState(true);
  const [displayMenuContent, setDisplayMenuContent] = useState(false);
  const [displaySearchResults, setDisplaySearchResult] =useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const {cinemaLocation, setCinemaLocation,movies,cinemas,comingSoonMovies} = useContext(MovieContext);
  const searchInputRef = useRef('');
  const searchBoxDivRef = useRef('');
  const location = useLocation();
  const currentPage = location.pathname;
  const navigate = useNavigate();

  const handleSearchIconClick = () =>{
    setDisplaySearchBox(true);
    setDisplayLocationIcon(false);
    setDisplayMenuIcon(false);
    setDisplayProfileIcon(false);
    setDisplaySearchResult(true);
    setDisplayMenuIcon(false);
  }
  const handleSearchCloseClick = ()=>{
    setDisplaySearchResult(false);
    setDisplaySearchBox(false);
    setDisplayLocationIcon(true);
    setDisplayMenuIcon(true);
    setDisplayProfileIcon(true); 
    searchInputRef.current.value = ''; 
    setSearchResults([]);
    setDisplayMenuIcon(true);  
  }

  const handleDisplayMenuContent = () =>{
    setDisplayMenuContent(true);
    setDisplayMenuIcon(false);
    setDisplaySearchIcon(false);;
  }
  const handleHideMenuContent = () =>{
    setDisplayMenuContent(false);
    setDisplayMenuIcon(true);
    setDisplaySearchIcon(true);
  }
  
  const handleSearch = (e)=>{
    setDisplaySearchResult(true);
    const filteredMovies = movies.filter((movie)=>{
      return movie.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    const fileteredComingSoonMovies = comingSoonMovies.filter((comingSoonMovie)=>{
      return comingSoonMovie.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    const filteredCinemas = cinemas.filter((cinema)=>{
      return cinema.name.toLowerCase().includes(e.target.value.toLowerCase()) || cinema.location.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchResults([...filteredMovies,...fileteredComingSoonMovies,...filteredCinemas]);
  }

  const handleSearchResultClick = (searchResult) =>{
    setDisplaySearchResult(false);
    if(searchResult.title){
      if(searchResult.ticketPrice){
        navigate(`/${searchResult.title}/details`, {state: {movie: searchResult} })
      }else{
        navigate(`/comingSoon/${searchResult.title}/details`, {state: {comingSoonMovie: searchResult} })
      }
    }else{
      navigate('/cinemas');
    }
    handleSearchCloseClick();
  }


  const handleLocationChange = () =>{
    if(cinemaLocation=='New York'){
      setCinemaLocation('Los Angeles');
    }else{
      setCinemaLocation('New York');
    }
  }

  useEffect(() => {
    if (displaySearchBox) {
      searchInputRef.current.focus();
    }
  }, [displaySearchBox]);
  useClickOutsideDiv(searchBoxDivRef, handleSearchCloseClick);

  return (
    <div className='headerContainer'>
      <div className='logo'>
        <img src='/images/logo.png'></img>
        <p> GS Cinema</p>
      </div>

      <div className='navbar'>        
        <div className={`navOption ${currentPage == "/" ? 'activePage' : ''}`}> <Link to ='/' > <Home /> <span > Home </span></Link> </div>       
        <div className={`navOption ${currentPage == "/shows" ? 'activePage' : ''}`}> <Link to ='/shows' > <ShowTime /> <span >  Show Timings </span> </Link> </div>        
        <div className={`navOption ${currentPage == "/cinemas" ? 'activePage' : ''}`}> <Link to ='/cinemas' > <Cinema /> <span >  Cinemas </span> </Link> </div>
        <div className={`navOption ${currentPage == "/about" ? 'activePage' : ''}`}> <Link to ='/about' > <AboutUs /> <span >  About Us </span></Link> </div>
      </div>

      <div className='navRight' ref={searchBoxDivRef}>
        <div className='searchIcon' style={displaySearchIcon ? {} : {display:'none'}}>
        <input className='searchBox' ref={searchInputRef} placeholder='Search movies and Cinemas' 
        onChange={handleSearch} style={{display: displaySearchBox?'flex':'none'}}></input>

         {
          displaySearchBox?
                <Button className='searchButton' onClick={handleSearchCloseClick} > <Close/> </Button>:
                <Button className='searchButton' onClick={handleSearchIconClick}> <Search/> </Button>
         }
        <div className='searchResults' style={{display: displaySearchResults?'flex': 'none'}}>
          <ul>
          { searchResults.length != 0 ?
            searchResults.map((result)=>(
              <li key={`${searchResults.id}+${searchResults.name}`} onClick={()=>handleSearchResultClick(result)}>
                { result.title? result.title : result.name+' ,'+result.location}                
              </li>
            )) : searchInputRef.current.value == ''?<li style={{color:'blue'}}> Start Searching...</li>: <li style={{color:'red'}}> No Match found </li>
          }
          </ul> 
        </div>
        </div>
        <div className='Location' style={displayLocationIcon ? {}: {display:'none'}}>
            <Button onClick={handleLocationChange}> <Location /> <span> {cinemaLocation} </span> <Switch /> </Button>
        </div>
        <div className='profile' style={displayProfileIcon ? {} : {display: 'none'}}>
            <Button onClick={()=>navigate('/profile')}> <Profile />  <span> Profile </span>  </Button>
        </div>
      </div>

      <div className='smallScreens'>
        <div className='menu' >  
          {
            displayMenuContent ? <div className='menuItemsList'>
            <Button className='menuItem closeButton' onClick={handleHideMenuContent}> <Close/> </Button>
            <Link className='menuItem' onClick={handleHideMenuContent} to='/'> <Home/> Home </Link>
            <Link className='menuItem' onClick={handleHideMenuContent} to='/shows'> <ShowTime /> Shows </Link>
            <Link className='menuItem' onClick={handleHideMenuContent} to='/cinemas'> <Cinema /> Cinemas </Link>
            <Link className='menuItem' onClick={handleHideMenuContent} to='/about'> <AboutUs /> About Us </Link>
            <Link className='menuItem' onClick={handleHideMenuContent} to='/profile'> <Profile /> Profile </Link> 
            </div> :  displayMenuIcon ? <Button  style={{marginTop:'0.75vh',color:'black'}} onClick={handleDisplayMenuContent}> <Menu/> </Button> : null
            
          }
        </div>

      </div>
    </div>
  )
}

export default Header
