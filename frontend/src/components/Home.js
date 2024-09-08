import '../styles/Home.css';
import { useContext } from 'react';
import { MovieContext } from '../context/moviesContext';

const Home = () => {
  const {movies, setMovies } = useContext(MovieContext);

  return (
    <div className='home'>
      <div className='slides'>
        five slides here
      </div>
      <div className='homeNav'>
        nav bar here
      </div>
      <div className='sectionHeading'>
        <h1>Now Showing</h1>
      </div>
      <div className='nowShowing'>
        { movies.map((movie)=> (
          <div key={movie.id} className='nowShowingContainers'> 
            <img src={movie.poster} alt={movie.title} />
          </div>
        )) }
      </div>
      <div className='comingSoon'>
        Coming Soon movies
      </div>
      <div className='trailers'>
        trailers
      </div>
    </div>
  )
}

export default Home
