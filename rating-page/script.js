// var searchform = document.querySelector('.searchform');
// var addButton = document.getElementById('button2');
// var removeButton = document.getElementById('button3');
var toWatchlistButton = document.getElementById('button1');
var rottenTomatoes = document.getElementById('rottentomatoes');
var imdbRating = document.getElementById('imdbrating');
var metaCritic = document.getElementById('metacritic')
var posterCard = document.getElementById('postercard');
var filmTitle = document.getElementById('filmtitle');
var runTime = document.getElementById('runtime');
var plot = document.getElementById('plot');
var omdbAPIkey = '1260ba33';
var watchmodeAPIkey = 'h0vFF0GYi3hvZkzF4vw5LphfH6Nx2LfrwlxaFQXw'
var filmid = '';

//this page should always be called for the first time with a film search, so load that film
if (window.location.search) {
    let query = window.location.search.slice(2);
    getFilm(query);
}


// searchform.addEventListener('submit', (event) => {
//     event.preventDefault();
//     searchentry = document.querySelector('input');
//     getFilm(searchentry.value);
//     searchentry.value='';
// })

// removeButton.addEventListener('click', () => {
//     localStorage.removeItem(filmid);
// })


 toWatchlistButton.addEventListener('click', () => {
     window.location.assign('../index.html');
 })

function getFilm(title) {
    omdbquery = 'https://www.omdbapi.com/?apikey=' + omdbAPIkey +'&t=' + title;

    fetch(omdbquery)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        rottenTomatoes.textContent = data.Ratings[1];  
        imdbRating.textContent = data.imdbRating;  
        metaCritic.textContent = data.Ratings[2];
        filmid.textContent = data.imdbID;
        runTime.textContent = parseFloat(data.Runtime);
        filmTitle.textContent = data.Title;
        plot = data.Plot;
        posterCard.src = data.Poster;
        return filmid
    })
    .then(function(imdbID) {
        watchmodequery = `https://api.watchmode.com/v1/title/${imdbID}/sources/?apiKey=${watchmodeAPIkey}&regions=US`

        fetch(watchmodequery)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           console.log(data)
           let subscription = [];
           for (let n =0; n<data.length; n++) {
            let source = data[n];
            if (source.type==="sub") {
                subscription.push(source.name)
            }
           }
           
        //    function addToWatchlist(filmID) {
        //     let obj = {
        //         title: filmTitle,
        //         id: filmID,
        //         runtime: parseFloat(runtime),
        //         postersrc: posterlink, 
        //         sources: subscription,
        //         plot: plot,
        //     }
        //     localStorage.setItem(filmID,JSON.stringify(obj));   
        // }

        })
    })
}