import { API_KEY } from './apikey.js';

const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const { name, released, description, publishers, genres, platforms, website, rating, ratings_count, stores, background_image, developers, tags, clip, screenshots } = gameData;
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
    
      
      articleDOM.querySelector("img.main-image").src = background_image;
      articleDOM.querySelector("p.developers span").innerHTML = developers.map(developer => developer.name).join(', ');
      articleDOM.querySelector("p.tags span").innerHTML = tags.map(tag => tag.name).join(', ');
      articleDOM.querySelector("video.presentation-video").src = clip.clip;
      articleDOM.querySelector("div.screenshots").innerHTML = screenshots.map(screenshot => `<img src="${screenshot.image}" alt="Screenshot of ${name}">`).join('');
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
    
    <img class="main-image" src="" alt="Main image">
    <h1 class="title"></h1>
            
            <h2>Informations générales</h2>
    <p class="rating">Note moyenne : <span></span></p>
    <p class="votes">Nombre de votes : <span></span></p>
    <p class="release-date">Date de sortie : <span></span></p>
    <p class="description"></p>
            
            <h2>Développeurs et éditeurs</h2>
    <p class="developers">Studio(s) de développement : <span></span></p>
    <p class="tags">Tags : <span></span></p>
    <p class="publisher">Éditeur : <span></span></p>
            
            <h2>Genres et plateformes</h2>
    <p class="genres">Genres : <span></span></p>
    <p class="platforms">Plateformes : <span></span></p>
            
            <h2>Tags</h2>
            <p class="tags">Tags : <span></span></p>
            
            <h2>Magasins</h2>
            <p class="stores">Magasins : <span></span></p>
            
            <h2>Site Web</h2>
    <a href="" class="website">Site Web</a>
            
            <h2>Vidéo de présentation</h2>
    <video class="presentation-video" controls>
      <source src="" type="video/mp4">
      Votre navigateur ne supporte pas la vidéo.
    </video>
    
            <h2>Captures d'écran</h2>
    <div class="screenshots"></div>
    <p class="stores">Magasins : <span></span></p>
  </div>
</section>
    `;

    preparePage();
  };

  render();
};
export default PageDetail;