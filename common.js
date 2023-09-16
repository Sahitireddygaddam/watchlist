export const watchlistArray =
  JSON.parse(localStorage.getItem("watchlistImdbArray")) || [];

window.addToWatchList = async (movieId) => {
  watchlistArray.push(movieId);
  localStorage.setItem("watchlistImdbArray", JSON.stringify(watchlistArray));
  showSnackBar(`Added ${movieId} to watchlist`);
};

export const renderMovie = async (movieId, actionBtn) => {
  const movieObj = await fetch(
    `https://www.omdbapi.com/?apikey=4485e4af&i=${movieId}`
  ).then((data) => data.json());

  return `<div id="movie-list">
                <img class="poster" src='${movieObj.Poster}'>
                <div class='title-rating'>
                    <h1 class="title">${movieObj.Title}</h1>
                    <p class="fa fa-star rating"> ${movieObj.imdbRating}</p>
                </div>
                <div class='run-genre'>
                    <p class="runtime">${movieObj.Runtime}</p>
                    <p class="genre">${movieObj.Genre}</p>
                    ${actionBtn}
                </div>
                <div class="description">
                    <p class="post">${movieObj.Plot}</p>
                </div>
            </div>`;
};

export const renderMovies = async (movieIds) => {
  if (movieIds.length === 0) return [""];
  const moviesStr = await Promise.all(
    movieIds.map(async (movieId) => {
      const actionBtn =
        watchlistArray && watchlistArray.indexOf(movieId) > -1
          ? `<button class ="addWatchlist fa fa-minus-circle" onclick="removeFromWatchList(
            '${movieId}'
          )" id="removeWatchlist">Remove</button>`
          : `<button class ="addWatchlist fa fa-plus-circle" onclick="addToWatchList(
            '${movieId}'
          )" id="addWatchlist">Watchlist</button>`;

      const movieStr = await renderMovie(movieId, actionBtn);
      return movieStr;
    })
  );

  return moviesStr;
};

export const showSnackBar = (message) => {
  const textNode = document.createTextNode(message);
  const snackBarElem = document.createElement("div");
  snackBarElem.setAttribute("id", "snackbar");
  snackBarElem.classList.add("show");
  snackBarElem.appendChild(textNode);
  document.body.append(snackBarElem);
  setTimeout(function () {
    snackBarElem.remove();
  }, 3000);
};
