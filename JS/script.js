var watchmodeAPIkey = 'h0vFF0GYi3hvZkzF4vw5LphfH6Nx2LfrwlxaFQXw';
var searchform = document.querySelector('form');

searchform.addEventListener('submit', (event) => {
    event.preventDefault();
    searchentry = document.querySelector('input');
    let film = (searchentry.value);
    window.location.assign('./rating-page/index.html?f=' + film);
})
