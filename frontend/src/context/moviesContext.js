import { createContext, useEffect, useState } from "react";
import moviesdata from '../data/movies.json';
import comingSoonMoviesData from '../data/comingSoonMovies.json';

const MovieContext = createContext();
const MovieProvider = ({children}) => {
    const [movies,setMovies] = useState([]);
    const [comingSoonMovies, setComingSoonMovies] = useState([]);

    useEffect( () => {
        setMovies(moviesdata.movies);
    },[]);
    useEffect( ()=>{
        setComingSoonMovies(comingSoonMoviesData.comingSoonMovies);
    }, []);


    return(
        <MovieContext.Provider value={{movies,setMovies,comingSoonMovies,setComingSoonMovies}}>
            {children}
        </MovieContext.Provider>
    )
};
export {MovieContext, MovieProvider}