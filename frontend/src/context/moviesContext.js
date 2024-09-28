import { createContext, useEffect, useState } from "react";
import moviesdata from '../data/movies.json';
import comingSoonMoviesData from '../data/comingSoonMovies.json';
import cinemasData from '../data/cinemas.json';

const MovieContext = createContext();
const MovieProvider = ({children}) => {
    const [movies,setMovies] = useState([]);
    const [comingSoonMovies, setComingSoonMovies] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [userName, setUserName] = useState('');
    const [userEmail,setUserEmail] = useState('');
    const [cinemaLocation, setCinemaLocation] = useState('New York')

    useEffect( () => {
        setMovies(moviesdata.movies);
    },[]);
    useEffect( ()=>{
        setComingSoonMovies(comingSoonMoviesData.comingSoonMovies);
    }, []);
    useEffect( ()=>{
        setCinemas(cinemasData.cinemas);
    }, []);

    return(
        <MovieContext.Provider value={{movies,setMovies,comingSoonMovies,setComingSoonMovies,cinemas,cinemasData,userName,userEmail
        ,cinemaLocation,setCinemaLocation,setUserName,setUserEmail}}>
            {children}
        </MovieContext.Provider>
    )
};
export {MovieContext, MovieProvider}