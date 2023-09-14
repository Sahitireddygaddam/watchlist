async function movieInfo(movie){
    const response = await fetch(`https://www.omdbapi.com/?apikey=4485e4af&i=${movie}`)
    const data = await response.json()
    let eachMovieInfo ={
                'imdb': movie,
                'title':data.Title,
                'poster': data.Poster,
                'genre':data.Genre,
                'imdbRating':data.imdbRating,
                'plot':data.Plot,
                'runtime':data.Runtime
                }
        if (data.Poster === 'N/A'){
            eachMovieInfo.poster ='images/movie.png'
        }
            return eachMovieInfo 
        }
        
export default movieInfo
                
                