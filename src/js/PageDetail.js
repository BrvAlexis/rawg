import { API_KEY } from './apikey.js';

const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const { name, released, description, publishers, genres, platforms, website, rating, ratings_count, stores } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = new Date(released).toLocaleDateString();
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector("p.publisher span").innerHTML = publishers && publishers.length > 0 ? publishers[0].name : 'N/A';
      articleDOM.querySelector("p.genres span").innerHTML = genres.map(genre => genre.name).join(', ');
      articleDOM.querySelector("p.platforms span").innerHTML = platforms.map(platform => platform.platform.name).join(', ');
      articleDOM.querySelector("a.website").href = website;
      articleDOM.querySelector("p.rating span").innerHTML = rating;
      articleDOM.querySelector("p.votes span").innerHTML = ratings_count;
      articleDOM.querySelector("p.stores span").innerHTML = stores.map(store => `<a href="${store.url_en}" target="_blank">${store.store.name}</a>`).join(', ');
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}${argument}?key=${API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        displayGame(data);
      })
      .catch((error) => console.log('There was a problem with the fetch operation: ' + error.message));
    };
    
    fetchGame(`https://api.rawg.io/api/games/`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
    <section class="page-detail">
        <div class="article">
          
          <h1 class="title"></h1>
          <p class="release-date">Release date : <span></span></p>
          <p class="description"></p>
          <p class="publisher">Publisher : <span></span></p>
          <p class="genres">Genres : <span></span></p>
          <p class="platforms">Platforms : <span></span></p>
          <a href="" class="website">Website</a>
          <p class="rating">Rating : <span></span></p>
          <p class="votes">Votes : <span></span></p>
          <p class="stores">Stores : <span></span></p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};
export default PageDetail;