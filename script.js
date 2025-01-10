const searchform = document.querySelector('form');
const moviecontainer = document.querySelector('.movie-container');
const inputbox = document.querySelector('.inputbox');

const getmovieinfo = async (movie) => {
    const myapikey = "125beb1c";
    const url = `http://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True") {
            showmoviedata(data);
        } else {
            moviecontainer.innerHTML = `<h1>Movie not found. Please try again.</h1>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        moviecontainer.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    }
};

const showmoviedata = (data) => {
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    // Clear previous movie details
    moviecontainer.innerHTML = "";

    // Create movie info container
    const movieelement = document.createElement('div');
    movieelement.classList.add('movie-info');

    movieelement.innerHTML = `
        <h2>${Title}</h2>
        <img src="${Poster}" alt="${Title}" class="movie-poster"/>
        <p><strong>Rating:</strong> ⭐ ${imdbRating}</p>
        <p><strong>Released Date:</strong> ${Released}</p>
        <p><strong>Duration:</strong> ${Runtime}</p>
        <p><strong>Cast:</strong> ${Actors}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
    `;

    // Create genre list
    const moviegenreelement = document.createElement('div');
    moviegenreelement.classList.add('movie-genre');
    Genre.split(",").forEach((genre) => {
        const genreElement = document.createElement('span');
        genreElement.classList.add('genre');
        genreElement.innerText = genre.trim();
        moviegenreelement.appendChild(genreElement);
    });

    // Append genre list to the movie info
    movieelement.appendChild(moviegenreelement);

    // Append movie details to the container
    moviecontainer.appendChild(movieelement);
};

// Handle the form submission
searchform.addEventListener('submit', (e) => {
    e.preventDefault();
    const moviename = inputbox.value.trim();
    if (moviename !== "") {
        getmovieinfo(moviename);
    } else {
        alert("Please enter a movie name.");
    }
});
