import {movies,windowScroll} from "/movie.js"
import movieInfo from "/movieInfo.js"

const movieContainer = document.getElementById("movie-container")

let watchlistArray=[]
let watchlistHtml =''
let watchListImdb = JSON.parse(localStorage.getItem('watchlistImdbArray'))

function WatchList(imdbList){
if (imdbList){
    movieContainer.classList.add("hidden")
imdbList.forEach(movie =>{
            movieInfo(movie).then(data =>{ 
                    watchlistArray.push(data) 
                    localStorage.setItem('watchlistArray', JSON.stringify(watchlistArray))
                    watchlistHtml+=movies(data)
                    movieContainer.innerHTML = watchlistHtml 
                })
        })
    }
}
movieContainer.onclick=(e) => {
    if(e.target.dataset.addwatchlist && watchListImdb.includes(e.target.dataset.addwatchlist)){
         let updateWatchListImdb = watchListImdb.push(e.target.dataset.addwatchlist)
         if(updateWatchListImdb){
              WatchList(updateWatchListImdb)
              }else{
                   movieContainer.classList.remove("hidden")
              }
         }
   if(e.target.id === 'scroll-btn'){
       document.body.scrollTop=0;
       document.documentElement.scrollTop=0;
   }
 }
 
 
WatchList(watchListImdb)
                
windowScroll()