import { watchlistArray, renderMovies, showSnackBar } from "./common.js";

window.removeFromWatchList = async (movieId) => {
  watchlistArray.splice(watchlistArray.indexOf(movieId), 1);
  localStorage.setItem("watchlistImdbArray", JSON.stringify(watchlistArray));
  showSnackBar(`Removed ${movieId} from watchlist`);
  refreshPage(document.getElementById("watchlist-container"));
};

async function refreshPage(domElem) {
  if (watchlistArray.length === 0) {
    domElem.innerHTML = `<h3>Your watchlist is looking a little empty</h3>
        <a href="index.html" class="fa fa-plus-circle watchlist" id="addMovies"> Let's add some Movies</a>`;
    return;
  }
  const movies = await renderMovies(watchlistArray);

  domElem.innerHTML = movies.join("");
}

refreshPage(document.getElementById("watchlist-container"));
