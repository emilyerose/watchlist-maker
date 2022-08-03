omdbAPIkey = '1260ba33';
watchmodeAPIkey = 'h0vFF0GYi3hvZkzF4vw5LphfH6Nx2LfrwlxaFQXw'


function getFilm(title) {
    omdbquery = 'https://www.omdbapi.com/?apikey=' + omdbAPIkey +'&t=' + title;
    let postersrc;
    let title;
    let runtime;
    let posterlink;
    let plot;
    let subscription = [];
    fetch(omdbquery)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        posterlink = data.Poster;
        console.log(data)
        let rottentomatoes;
        if (data.Ratings[1]){
            rottentomatoes = data.Ratings[1].Value
        }
        
        let id = data.imdbID;
        runtime = parseFloat(data.Runtime);
        title = data.Title;
        plot = data.Plot;
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
                title: data.Title,
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

getFilm('black swan')


