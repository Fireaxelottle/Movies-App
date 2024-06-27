// i do not know what i am doing i am just making the website and forgetting how i did it so i am not putting comments every where this is a mess of  code so dont try toread it





const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get movie by search
form.addEventListener('submit', (e) => {
    e.preventDefault();

    getmoviebyserach();
});

async function getmoviebyserach() {
    const resp = await fetch(SEARCHAPI + search.value);
    const respData = await resp.json();
    showMovie(respData.results);
}

// first page movies
async function getMovie() {
    const resp = await fetch(APIURL);
    const respData = await resp.json();

    showMovie(respData.results);
}

// GENERATION OF movie CARD

function showMovie(movies) {
    let i = 0;
    main.innerHTML = "";
    let imgSrc;

    movies.forEach(() => {

        const movie = movies[i];
        if (movie.poster_path) {
            imgSrc = IMGPATH + movie.poster_path;
        } else {
            imgSrc = "No-Image-Placeholder.svg.png";
        }

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie')


        movieEl.innerHTML = `
            <img
                src="${imgSrc}"
                alt="Sry could not load the poster of ${movie.original_title} movie"
            />
            <div class="movie-info">
                <h3>${movie.original_title}</h3>
                <span class="
                    vote_average
                )}">${movie.vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview: ${movie.overview}</h3>
            </div>
    `

        const rating = movieEl.querySelector('.vote_average');

        if (movie.vote_average < 5) {
            rating.classList.add('red')
        } else if (movie.vote_average > 5 && movie.vote_average < 8) {
            rating.classList.add('orange')
        } else {
            rating.classList.add('green')
        }

        main.appendChild(movieEl);

        i++;
    });


};


getMovie();