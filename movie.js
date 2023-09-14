


 function movies(movie){
    let getMovieHtml= '' 
    getMovieHtml = `<div id="movie-list">
                <img class="poster" src='${movie.poster}'>
                <div class='title-rating'>
                    <h1 class="title">${movie.title}</h1>
                    <p class="fa fa-star rating"> ${movie.imdbRating}</p>
                </div>
                <div class='run-genre'>
                    <p class="runtime">${movie.runtime}</p>
                    <p class="genre">${movie.genre}</p>
                    <button class ="addWatchlist fa fa-plus-circle" data-addWatchlist="${movie.imdb}"
                     id="addWatchlist">Watchlist</button>
                </div>
                <div class="description">
                    <p class="post">${movie.plot}</p>
                </div>
            </div>`
 return getMovieHtml
}

 function windowScroll(){
     
     window.onscroll =()=> {

        (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20)
            ? document.getElementById('scroll-btn').style.display = "block"
            : document.getElementById('scroll-btn').style.display = "none"
    }
}


export { movies, windowScroll}