var searchform = document.querySelector('.searchform');
var addButton = document.querySelector('#button2');
var removeButton = document.querySelector('#button3');
var toWatchlistButton = document.querySelector('#button1');
var omdbAPIkey = '1260ba33';
var watchmodeAPIkey = 'h0vFF0GYi3hvZkzF4vw5LphfH6Nx2LfrwlxaFQXw'
var filmid;

searchform.addEventListener('submit', (event) => {
    event.preventDefault();
    searchentry = document.querySelector('input');
    getFilm(searchentry.value);
    searchentry.value='';
})


addButton.addEventListener('click', () => {
    addToWatchlist(filmid);
})

removeButton.addEventListener('click', () => {
    localStorage.removeItem(filmid);
})

toWatchlistButton.addEventListener('click', () => {
    window.location.assign('../index.html');
})

function getFilm(title) {
    omdbquery = 'https://www.omdbapi.com/?apikey=' + omdbAPIkey +'&t=' + title;
    let formaltitle;
    let runtime;
    let posterlink;
    let plot;
    fetch(omdbquery)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        let ratings = data.Ratings;    
        filmid = data.imdbID;
        runtime = parseFloat(data.Runtime);
        formaltitle = data.Title;
        plot = data.Plot;
        posterlink = data.Poster;
        return filmid
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
           let subscription = [];
           for (source in data) {
            if (source.type==="sub") {
                subscription.push(source.name)
            }
           }
           
           function addToWatchlist(filmID) {
            let obj = {
                title: formaltitle,
                id: filmID,
                runtime: parseFloat(data.Runtime),
                postersrc: posterlink, 
                sources: subscription,
                plot: plot,
            }
            localStorage.setItem(filmID,JSON.stringify(obj));
            
        }
           
        })
    })
}