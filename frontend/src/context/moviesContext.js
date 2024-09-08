import { createContext, useEffect, useState } from "react";
import moviesdata from '../data/movies.json';

const MovieContext = createContext();
const MovieProvider = ({children}) => {
    const [movies,setMovies] = useState([]);
    useEffect( () => {
        setMovies(moviesdata.movies);
    },[])
    return(
        <MovieContext.Provider value={{movies,setMovies}}>
            {children}
        </MovieContext.Provider>
    )
};
export {MovieContext, MovieProvider}