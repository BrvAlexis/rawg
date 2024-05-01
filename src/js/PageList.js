import { API_KEY } from './apikey.js';

const platformIcons = {
  mac: 'src/assets/images/apple.svg',
  xbox: 'src/assets/images/xbox.svg',
  pc: 'src/assets/images/windows.svg',
  nintendo: 'src/assets/images/switch.svg',
  playstation: 'src/assets/images/ps4.svg',
  android: 'src/assets/images/mobile.svg',
  linux: 'src/assets/images/linux.svg'
};
const fetchPlatforms = () => {
  fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      const selectElement = document.querySelector('.platform-select');
      data.results.forEach((platform) => {
        const optionElement = document.createElement('option');
        optionElement.value = platform.id;
        optionElement.textContent = platform.name;
        selectElement.appendChild(optionElement);
      });
    });
    
};
let count = 0
const PageList = (argument = '', containerId = 'pageContent') => {
    
    const preparePage = () => {
        const platform = document.querySelector('.platform-select').value;
        const cleanedArgument = argument.trim().replace(/\s+/g, '-');
    
        const displayResults = (articles, append = false) => {
          const resultsContent = articles.map((article) => {
              const articleHTML = `
                  <article class="cardGame">
                      <a href="#pagedetail/${article.slug}" class="game-details-link">
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
                              ${article.parent_platforms.map(parentPlatform => 
                                  platformIcons[parentPlatform.platform.slug] ?
                                  `<span>
                                      <img src="${platformIcons[parentPlatform.platform.slug]}" alt="${parentPlatform.platform.name}" />
                                  </span>` :
                                  `<span>${parentPlatform.platform.name}</span>`
                              ).join('')}
                          </div>
                          <div class="hover-info">
                              Date de sortie : ${article.released} <br>
                              Éditeur : ${article.publishers && article.publishers.length > 0 ? article.publishers[0].name : 'N/A'} <br>
                              Genres : ${article.genres.map(genre => genre.name).join(', ')} <br>
                              Note : ${article.rating}/5 <br>
                              Votes : ${article.ratings_count}
                          </div>
                      </a>
                      
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
            if (!append) {
              resultsContainer.innerHTML = '';
            }
            resultsContent.forEach(element => resultsContainer.appendChild(element));
          };
    
          const fetchList = (url, argument, platform, page = 1) => {
            const nextYear = new Date().getFullYear() + 1;
            let finalURL = argument ? `${url}&search=${argument}&page_size=9&ordering=-added&page=${page}` : `${url}&dates=${nextYear}-01-01,${nextYear}-12-31&page_size=9&page=${page}`;
            if (platform) {
              finalURL += `&platforms=${platform}`;
            }
            fetch(finalURL)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                displayResults(data.results, page > 1);
              });
          };
          
          fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument, platform, count + 1);
        };
              
        

              // Add an event listener to the platform select
              document.querySelector('.platform-select').addEventListener('change', function(event) {
                PageList(document.querySelector('.search-form input[type="text"]').value);
              });

    
      
              const render = () => {
                const pageContent = document.getElementById(containerId);
            
                // Créez un nouvel élément section pour contenir le contenu de PageList
                const pageListSection = document.createElement('section');
                pageListSection.className = 'page-list';
                pageListSection.innerHTML = `
                  <div class="articles">Loading...</div>
                  <button id="showMore">SHOW MORE</button>
                `;
                // Ajoutez la section à pageContent
  pageContent.appendChild(pageListSection);

         // Maintenant que le bouton "Show more" est dans le DOM, vous pouvez y ajouter un écouteur d'événements
  document.getElementById('showMore').addEventListener('click', function() {
    count++;
    PageList(document.querySelector('.search-form input[type="text"]').value);
    if (count >= 2) {
        // Cachez le bouton "Show more" après 2 clics
        this.style.display = 'none';
    }
  });
    // Ajoutez la section à pageContent
    pageContent.appendChild(pageListSection);
        preparePage();
        fetchPlatforms();
      };
    
      render();
      console.log(pageContent.innerHTML);
      
    };


    








document.addEventListener('DOMContentLoaded', function() {
  fetchPlatforms();
});
    
export default PageList;