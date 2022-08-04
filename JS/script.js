var watchmodeAPIkey = 'h0vFF0GYi3hvZkzF4vw5LphfH6Nx2LfrwlxaFQXw';
var searchform = document.querySelector('form');

searchform.addEventListener('submit', (event) => {
    event.preventDefault();
    searchentry = document.querySelector('input');
    let film = (searchentry.value);
    window.location.assign('./rating-page/index.html?f=' + film);
})

 function populatePage() {
    for (const key in localStorage) {
        let obj = localStorage.getItem(key);
        let title = obj.title;
        let runtime = obj.runtime;
        let posterlink = obj.postersrc;
        let plot = obj.plot;
        let sourcesArr = obj.sources;
        
        //get sources from watchmode later, for now, just grab them from local storage
    }
 }
