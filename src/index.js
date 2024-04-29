import 'jquery';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.scss'; // Attention ici, il faut bien mettre l'extension `.scss`
import PageList from './js/PageList.js';
import Home from './js/Home.js';
import PageDetail from './js/PageDetail.js';
import routes from './js/routes.js';

const callRoute = () => {
    const { hash } = window.location;
    const pathParts = hash.substring(1).split('/');
  
    const pageName = pathParts[0];
    const pageArgument = pathParts[1] || '';
    const pageFunction = routes[pageName];
  
    if (pageFunction !== undefined) {
      pageFunction(pageArgument);
    }
  };
  
  window.addEventListener('hashchange', () => callRoute());
  window.addEventListener('DOMContentLoaded', () => callRoute());