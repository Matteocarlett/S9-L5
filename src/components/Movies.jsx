import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";
import SingleMovie from "./SingleMovie";
import "../styles.css";

const Movies = ({ title, onMovieSelect }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiLink = "http://www.omdbapi.com/?i=tt3896198&apikey=7d6429dd";
      try {
        const response = await fetch(`${apiLink}&s=${title}`);
        if (response.ok) {
          const moviesData = await response.json();
          setMovies(moviesData.Search || []);
        } else {
          console.error("Errore nella richiesta API per i film");
        }
      } catch (error) {
        console.error("Errore nella richiesta API:", error);
      }
    };

    fetchMovies();
  }, [title]);

  return (
    <>
      <h2>{title}</h2>
      <Col className="ms-5">
        {movies.slice(0, 8).map((movie) => (
          <SingleMovie
            key={movie.imdbID}
            img={movie.Poster}
            title={movie.Title}
            movieId={movie.imdbID}
            onMovieSelect={onMovieSelect}
          />
        ))}
      </Col>
    </>
  );
};

export default Movies;