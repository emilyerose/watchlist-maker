var watchmodeAPIkey = 'h0vFF0GYi3hvZkzF4vw5LphfH6Nx2LfrwlxaFQXw';
var omdbAPIkey = '1260ba33';
var searchform = document.querySelector('form');
var filmid;






searchform.addEventListener('submit', (event) => {
    event.preventDefault();
    searchentry = document.querySelector('input');
    let film = (searchentry.value);
    getFilm(film);
    function resolveAfter2Seconds() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, 700);
        });
      }
      
      async function asyncCall() {
        const result = await resolveAfter2Seconds();
        window.location.assign('./rating-page/index.html?f=' + film)
      }
      
      asyncCall();
})

document.addEventListener('click', (event) => {
    if (event.target.matches('.remove-wl')){
        let id = event.target.id
        localStorage.removeItem(id)
        window.location.reload()
    }

})


async function getFilm(title) {
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
        filmid = data.imdbID;
        runtime = parseFloat(data.Runtime);
        formaltitle = data.Title;
        plot = data.Plot;
        posterlink = data.Poster;
        return filmid
    })
    .then(function(imdbID) {
        watchmodequery = `https://api.watchmode.com/v1/title/${imdbID}/sources/?apiKey=${watchmodeAPIkey}&regions=US`

        fetch(watchmodequery)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           let subscription = [];
           for (let n =0; n<data.length; n++) {
            let source = data[n];
            if (source.type==="sub") {
                subscription.push(source.name)
            }
           }
           
           
            let obj = {
                title: formaltitle,
                id: filmid,
                runtime: parseFloat(runtime),
                postersrc: posterlink, 
                sources: subscription,
                plot: plot,
            }
            localStorage.setItem(filmid,JSON.stringify(obj));   
           
        })
    })
}

populatePage();

 function populatePage() {
  var container = document.querySelector('.movie-cards');
    if (localStorage.length===0) {
       var noRecent = document.createElement('p');
      //  noRecent.classList.add('is-half');
       noRecent.textContent = "There are no items in your Watchlist currently.";
       container.appendChild(noRecent);
    }
    else {
    for (let x =0; x<localStorage.length; x++) {
        let key = localStorage.key(x);
        let obj = JSON.parse(localStorage.getItem(key));
        let title = obj.title;
        let runtime = obj.runtime;
        let posterlink = obj.postersrc;
        let plot = obj.plot;
        let sourcesStr;
        if (obj.sources.length) {
            sourcesStr = 'Available to stream via ' + obj.sources.join(', ');
        }
        else {
            sourcesStr = 'Not available on any subscription streaming sites'
        }
        
            var card = document.createElement("div");
            card.classList.add('card','column', 'is-one-fifth', 'is-multiline');
            card.innerHTML = `
            <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                <span><i class="fa-solid fa-ellipsis"></i></span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu4" role="menu">
              <div class=" dropdown-content" >
                <div class="dropdown-item">
                  <p class="remove-wl removeBtn" id = ${obj.id} style='cursor: pointer'> Remove from watchlist </p>
                </div>
              </div>
            </div>
           </div>
           
           <div class="card-image">
            <figure>
              <img class="to-right"
                src=${posterlink}
                alt="${title} image"
              />
            </figure>
           </div>
           <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title movie-title is-4">${title}</p>
                <h3 class="media-left streaming"> ${sourcesStr}</h3>
                <div class="streaming-services"></div>
              </div>
            </div>
            <div class="content">
              <p>${plot}</p>
              <br />
            </div>
           </div>`
        
        

           container.appendChild(card);
        }
        
    }


 }



 
