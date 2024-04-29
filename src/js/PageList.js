import { API_KEY } from './apikey.js';

const platformIcons = {
  'PC': './src/assets/images/windows.svg',
  'PlayStation': './src/assets/images/playstation.svg',
  'LINUX': './src/assets/images/linux-svgrepo-com.svg',
  'Xbox' : './src/assets/images/xbox.svg',
  'iOS' : './src/assets/images/phone.svg',
  'Nintendo': './src/assets/images/nintendo-switch.svg'
  
  // Ajoutez d'autres plateformes et leurs icônes ici
};


const PageList = (argument = '') => {
    const preparePage = () => {
      
        const cleanedArgument = argument.trim().replace(/\s+/g, '-');
    
        const displayResults = (articles) => {
          const resultsContent = articles.map((article) => (
            `<article class="cardGame">
            <div class="game-image" 
                 data-released="${article.released}" 
                 data-publisher="${article.publishers && article.publishers.length > 0 ? article.publishers[0].name : 'N/A'}" 
                 data-genres="${article.genres.map(genre => genre.name).join(', ')}"
                 data-rating="${article.rating}"
                 data-votes="${article.ratings_count}">
              <img src="${article.background_image}" alt="${article.name}">
            </div>
            <h1 class="game-name">${article.name}</h1>
            <div class="game-platforms">
              ${article.platforms.map(platform => 
                `<img src="${platformIcons[platform.platform.slug]}" alt="${platform.platform.name}">`
              ).join('')}
            </div>
            <a href="#pagedetail/${article.slug}" class="game-details-link">Voir les détails</a>
          </article>`
          ));
          const resultsContainer = document.querySelector('.page-list .articles');
          resultsContainer.innerHTML = resultsContent.join("\n");
        };
    
        const fetchList = (url, argument) => {
          const finalURL = argument ? `${url}&search=${argument}&page_size=9&ordering=-released` : url;
          fetch(finalURL)
            .then((response) => response.json())
            .then((data) => {
              console.log(data); // Ajoutez cette ligne
              displayResults(data.results);
              
            });
        };
        
        fetchList(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`, cleanedArgument);
      };
    
      const render = () => {
        pageContent.innerHTML = `
          <section class="page-list">
            <div class="articles">Loading...</div>
          </section>
        `;
    
        preparePage();
      };
    
      render();
    };
    

// Ajoutez ce code pour ajouter un gestionnaire d'événements 'input' à votre champ de recherche
document.querySelector('.search-form input[type="text"]').addEventListener('input', function(event) {
  // Obtient le terme de recherche de l'input
  const searchTerm = event.target.value;

  // Appelle PageList avec le terme de recherche
  PageList(searchTerm);
});
    
    
export default PageList;