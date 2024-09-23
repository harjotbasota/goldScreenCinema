import { createContext, useEffect, useState } from "react";
import moviesdata from '../data/movies.json';
import comingSoonMoviesData from '../data/comingSoonMovies.json';
import cinemasData from '../data/cinemas.json';

const MovieContext = createContext();
const MovieProvider = ({children}) => {
    const [movies,setMovies] = useState([]);
    const [comingSoonMovies, setComingSoonMovies] = useState([]);
    const [cinemas, setCinemas] = useState([]);

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
        <MovieContext.Provider value={{movies,setMovies,comingSoonMovies,setComingSoonMovies,cinemas,cinemasData}}>
            {children}
        </MovieContext.Provider>
    )
};
export {MovieContext, MovieProvider}