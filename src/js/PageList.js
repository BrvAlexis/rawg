import { API_KEY } from './apikey.js';

const platformIcons = {
  'PC': './src/assets/images/windows.svg',
  'PlayStation 5': './src/assets/images/playstation.svg',
  'LINUX': './src/assets/images/linux-svgrepo-com.svg',
  'Xbox One' : './src/assets/images/xbox.svg',
  'iOS' : './src/assets/images/phone.svg',
  'Nintendo': './src/assets/images/nintendo-switch.svg'
  
  // Ajoutez d'autres plateformes et leurs icônes ici
};


const PageList = (argument = '') => {
    const preparePage = () => {
      
        const cleanedArgument = argument.trim().replace(/\s+/g, '-');
    
        const displayResults = (articles) => {
          const resultsContent = articles.map((article) => {
            const articleHTML = `
              <article class="cardGame">
                <div class="game-image" 
                     data-released="${article.released}" 
                     data-publisher="${article.publishers && article.publishers.length > 0 ? article.publishers[0].name : 'N/A'}" 
                     data-genres="${article.genres.map(genre => genre.name).join(', ')}"
                     data-rating="${article.rating}"
                     data-votes="${article.ratings_count}">
                  <div class="image-container">
                     <img src="${article.background_image}" alt="${article.name}">
                  </div>
                </div>
                <h1 class="game-name">${article.name}</h1>
                <div class="game-platforms">
                  ${article.platforms.map(platform => 
                    `<span>${platform.platform.name}</span>`
                  ).join('')}
                </div>
                <a href="#pagedetail/${article.slug}" class="game-details-link">Voir les détails</a>
                <div class="hover-info">
                ${article.released} - ${article.publishers && article.publishers.length > 0 ? article.publishers[0].name : 'N/A'} - ${article.genres.map(genre => genre.name).join(', ')} - Rating: ${article.rating} - Votes: ${article.ratings_count}
              </div>

              </article>`;
        
              const articleElement = document.createElement('div');
              articleElement.innerHTML = articleHTML.trim();
          
              articleElement.querySelector('.game-image img').addEventListener('mouseover', function(event) {
                const hoverElement = event.target.parentNode.querySelector('.hover-info');
                hoverElement.style.opacity = '1';
              });
          
              articleElement.querySelector('.game-image img').addEventListener('mouseout', function(event) {
                const hoverElement = event.target.parentNode.querySelector('.hover-info');
                hoverElement.style.opacity = '0';
              });
          
              return articleElement.firstChild;
            });
        
          const resultsContainer = document.querySelector('.page-list .articles');
          resultsContainer.innerHTML = '';
          resultsContent.forEach(element => resultsContainer.appendChild(element));
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
        
        fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
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