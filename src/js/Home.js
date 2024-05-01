import PageList from './PageList.js';


const Home = (argument = '') => {
  console.log("Home function is called");
  const pageContent = document.getElementById('pageContent');
  console.log(pageContent);
  // Create new elements
  const h1 = document.createElement('h1');
  h1.textContent = 'Welcome,';
  
  const p = document.createElement('p');
  p.textContent = `The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
  the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
  brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
  groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
  with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure`;
  
  // Append new elements
  pageContent.appendChild(h1);
  pageContent.appendChild(p);

  // Create a container for PageList
  const pageListContainer = document.createElement('div');
  pageListContainer.id = 'pageListContainer';
  pageContent.appendChild(pageListContainer);

  // Call PageList to display its content in the container
  PageList(argument, 'pageListContainer');
};

export default Home;