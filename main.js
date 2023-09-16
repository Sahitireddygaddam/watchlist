import { watchlistArray, renderMovies } from "./common.js";

async function searchMovies(e) {
  e.preventDefault();

  const searchForMovie = new FormData(e.target).get("movie-input");

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=4485e4af&s=${searchForMovie}`
  ).then((data) => data.json());

  const movies = await renderMovies(
    response.Search.map((movie) => movie.imdbID).filter(
      (movieId) => watchlistArray.indexOf(movieId) < 0
    )
  );

  document.getElementById("movie-container").innerHTML = movies.join("");
}

document.addEventListener("DOMContentLoaded", function (e) {
  document
    .getElementById("input-holder")
    .addEventListener("submit", searchMovies);
});
