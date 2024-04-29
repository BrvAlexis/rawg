import { API_KEY } from './apikey.js';

const PageList = (argument = '') => {
    const preparePage = () => {
        const cleanedArgument = argument.trim().replace(/\s+/g, '-');
    
        const displayResults = (articles) => {
          const resultsContent = articles.map((article) => (
            `<article class="cardGame">
              <h1>${article.name}</h1>
              <h2>${article.released}</h2>
              <a href="#pagedetail/${article.id}">${article.id}</a>
            </article>`
          ));
          const resultsContainer = document.querySelector('.page-list .articles');
          resultsContainer.innerHTML = resultsContent.join("\n");
        };
    
        const fetchList = (url, argument) => {
          const finalURL = argument ? `${url}&search=${argument}` : url;
          fetch(finalURL)
            .then((response) => response.json())
            .then((responseData) => {
              displayResults(responseData.results)
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
    export default PageList;