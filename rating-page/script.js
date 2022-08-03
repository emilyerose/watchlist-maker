var searchform = document.querySelector('.searchform');
var omdbAPIkey = '1260ba33';
var watchmodeAPIkey = 'h0vFF0GYi3hvZkzF4vw5LphfH6Nx2LfrwlxaFQXw'

searchform.addEventListener('submit', (event) => {
    event.preventDefault();
    searchentry = document.querySelector('input');
    getFilm(searchentry.value);
    searchentry.value='';
})




function getFilm(title) {
    omdbquery = 'https://www.omdbapi.com/?apikey=' + omdbAPIkey +'&t=' + title;
    let formaltitle;
    let runtime;
    let posterlink;
    let plot;
    let subscription = [];
    fetch(omdbquery)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        let rottentomatoes;
        if (data.Ratings[1]){
            rottentomatoes = data.Ratings[1].Value
        }
        
        let id = data.imdbID;
        runtime = parseFloat(data.Runtime);
        formaltitle = data.Title;
        plot = data.Plot;
        posterlink = data.Poster;
        return id
    })
    .then(function(imdbID) {
        watchmodequery = `https://api.watchmode.com/v1/title/${imdbID}/sources/?apiKey=${watchmodeAPIkey}&regions=US`
        //watchmodequery = 'https://api.watchmode.com/v1/sources/?regions=US&apiKey=' + watchmodeAPIkey
        fetch(watchmodequery)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           console.log(data)
           let subscription = []
           for (source in data) {
            if (source.type==="sub") {
                subscription.push(source.name)
            }
           }
           
           function addToWatchlist(filmID) {
            let obj = {
                title: formaltitle,
                runtime: parseFloat(data.Runtime),
                postersrc: posterlink, 
                sources: subscription,
                plot: plot,
            }
            localStorage.setItem('id',JSON.stringify(obj));
            
        }
           
        })
    })
}