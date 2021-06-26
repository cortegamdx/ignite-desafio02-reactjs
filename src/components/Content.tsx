import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";
import "../styles/content.scss";


interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
  
}

interface GenreProps{
  id:number
  title:string;
}

export function Content(props:GenreProps) {

  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() =>{
    
    api.get<MovieProps[]>(`movies/?Genre_id=${props.id}`).then(response => {
      setMovies(response.data);
    });
  },[props.id])
  
  return (
   
      <div className="container">
        <header>
          <span className="category">Categoria:<span> {props.title}</span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  )

}
