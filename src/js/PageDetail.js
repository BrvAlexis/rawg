import { API_KEY } from './apikey.js';
import PageList from './PageList.js';

window.PageList = PageList;

const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const fetchMovies = (gameId) => {
      fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${API_KEY}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const movies = data.results;
          const moviesDOM = document.querySelector(".movies");
          if (movies.length > 0) {
            const movie = movies[0]; // Prenez seulement le premier film

            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");

            const titleElement = document.createElement("h3");
            titleElement.textContent = movie.name;
            movieElement.appendChild(titleElement);

            const videoElement = document.createElement("video");
            videoElement.src = movie.preview;
            videoElement.controls = true;
            videoElement.width = 800; // Définissez la largeur de la vidéo
            videoElement.height = 450; // Définissez la hauteur de la vidéo
            movieElement.appendChild(videoElement);

            moviesDOM.appendChild(movieElement);
          }
        })
        .catch((error) => console.log('There was a problem with the fetch operation: ' + error.message));
    };

    const displayGame = (gameData, screenshotsData) => {
      const { name, released, description, publishers, genres, platforms, website, rating, ratings_count, stores, background_image, developers, tags, clip } = gameData;
      const screenshots = screenshotsData.results;
      const articleDOM = document.querySelector(".page-detail .article");

      if (name && rating && ratings_count) {
        articleDOM.querySelector("h1.title").innerHTML = `${name} <span class="votes-and-rating">${rating}/5 - ${ratings_count} votes</span>`;
      }
      if (released) {
        articleDOM.querySelector("p.release-date span").innerHTML = new Date(released).toLocaleDateString();
      }
      if (description) {
        articleDOM.querySelector("p.description").innerHTML = description;
      }
      if (publishers && publishers.length > 0) {
        articleDOM.querySelector("p.publisher span").innerHTML = publishers[0].name;
      }
      if (genres) {
        articleDOM.querySelector("p.genres span").innerHTML = genres.map(genre => genre.name).join(', ');
      }
      if (platforms) {
        articleDOM.querySelector("p.platforms span").innerHTML = platforms.map(platform => platform.platform.name).join(', ');
      }
      if (website) {
        articleDOM.querySelector("a.website").href = website;
      }
      if (stores) {
        articleDOM.querySelector("p.stores span").innerHTML = stores.map(store => `<a href="${store.url_en}" target="_blank">${store.store.name}</a>`).join('<br>');
      }
      if (background_image) {
        articleDOM.querySelector("img.main-image").src = background_image;
      }
      if (developers) {
        articleDOM.querySelector("p.developers span").innerHTML = developers.map(developer => `<a href="#" onclick="event.preventDefault(); PageList('${developer.name}');">${developer.name}</a>`).join(', ');
      }
      if (tags) {
        articleDOM.querySelector("p.tags span").innerHTML = tags.map(tag => tag.name).join(', ');
      }
      if (clip) {
        articleDOM.querySelector("video.presentation-video").src = clip.clip;
      }
      if (screenshots) {
        articleDOM.querySelector("div.screenshots").innerHTML = screenshots.map(screenshot => `<img src="${screenshot.image}" alt="Screenshot of ${name}">`).join('');
      }
      fetchMovies(gameData.id);
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}${argument}?key=${API_KEY}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((gameData) => {
          fetch(`${url}${argument}/screenshots?key=${API_KEY}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((screenshotsData) => {
              displayGame(gameData, screenshotsData);
            })
            .catch((error) => console.log('There was a problem with the fetch operation: ' + error.message));
        })
        .catch((error) => console.log('There was a problem with the fetch operation: ' + error.message));
    };

    fetchGame(`https://api.rawg.io/api/games/`, cleanedArgument);
  };

  const render = () => {
    document.querySelector("#pageContent").innerHTML = `
    <section class="page-detail">
      <div class="article">
        <img class="main-image" src="" alt="Main image">
        <h1 class="title"></h1>
        <p class="description"></p>
        <div class="container">
          <p class="release-date"><strong>Release Date</strong><br><span></span></p>    
          <p class="developers"><strong>Developer</strong> <br><span></span></p>
          <p class="platforms"><strong>Platforms</strong><br><span></span></p>
          <p class="publisher"><strong>Publiser</strong><br><span></span></p>
          <p class="genres"><strong>Genre</strong> <br><span></span></p>
          <p class="tags"><strong>Tags</strong> <br><span></span></p>
        </div>
        <h2>BUY</h2>
        <p class="stores"><span></span></p>      
        <a href="" class="website">Check Website</a>
        <h2>TRAILER</h2>
        <div class="movies"></div>
        <h2>SCREENSHOTS</h2>
        <div class="screenshots"></div>
      </div>
    </section>
    `;

    preparePage();
  };

  render();
};

export default PageDetail;
            
           
            
            
            
            
