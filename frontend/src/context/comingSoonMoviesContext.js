import { createContext, useState } from "react";
import '../data/comingSoonMovies.json';

const ComingSoonMoviesContext = createContext();
const ComingSoonMoviesContextProvider = ({children})=>{
    const [comingSoonMovies, setComingSoonMovies] = useState('hi from coming soon context');
    return(
        <ComingSoonMoviesContext value={{comingSoonMovies,setComingSoonMovies}}>
            {children}
        </ComingSoonMoviesContext>
    );
}

export {ComingSoonMoviesContext,ComingSoonMoviesContextProvider}