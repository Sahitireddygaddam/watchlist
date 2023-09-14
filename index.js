
import {movies,windowScroll} from "/movie.js"
import movieInfo from "/movieInfo.js"


const movieContainer = document.getElementById("movie-container")
const formInput = document.getElementById("input-holder")
const closeBNtn = document.getElementById("close")

let movieHtmlArray =''
let moviesArray=[]
let watchlistImdbArray =[]

closeBNtn.addEventListener('click',()=>{
    movieContainer.innerHTML =''
    movieContainer.classList.remove('hidden')
    })

formInput.onsubmit = async e =>{
    e.preventDefault()
    const myFormData = new FormData(e.target)
    const searchForMovie = myFormData.get('movie-input')
    const response = await fetch(`https://www.omdbapi.com/?apikey=4485e4af&s=${searchForMovie}`)
    const data = await response.json()
    
    if (data.Response === 'False') {
        movieContainer.classList.add('movie-container-margin')
        movieContainer.innerHTML = `
                                <p style="margin:0 1em;color:#A5A5A5;text-align:center;" >
                                Unable to find what you’re looking for. Please try another search.
                                </p>  
                                `
    }
    else{
        let imdbIdArray = data.Search.map(movie => movie.imdbID)
        localStorage.setItem('imdbIdArray', JSON.stringify(imdbIdArray))
        imdbIdArray.forEach(movie =>{
            movieInfo(movie).then(data =>{ 
                movieHtmlArray+=movies(data)
                movieContainer.innerHTML = movieHtmlArray
                moviesArray.push(data) 
                localStorage.setItem('movieArray', JSON.stringify(moviesArray))
                })
            })
             
        }
    }
    
 movieContainer.onclick=(e) => {
    if(e.target.dataset.addwatchlist && !watchlistImdbArray.includes(e.target.dataset.addwatchlist)){
          watchlistImdbArray.push(e.target.dataset.addwatchlist)
          localStorage.setItem('watchlistImdbArray',JSON.stringify(watchlistImdbArray))
   }
   if(e.target.id === 'scroll-btn'){
       document.body.scrollTop=0;
       document.documentElement.scrollTop=0;
   }
 }
    

    
 
windowScroll()