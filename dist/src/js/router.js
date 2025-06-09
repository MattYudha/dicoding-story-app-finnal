import HomeView from './views/home.js';
import LandingView from './views/landing.js';
import StoriesView from './views/stories.js';
import AddStoryView from './views/add-story.js';
import DetailView from './views/detail.js';
import LoginView from './views/login.js';
import RegisterView from './views/register.js';
import SubscribeView from './views/subscribe.js';
import FavoritesView from './views/favorites.js';
import AboutView from './views/about.js';
import NotFoundView from './views/not-found.js';
import { navigateWithTransition } from './utils/transition.js';
import { getToken, removeToken } from './utils/auth.js';

const routes = {
  '#/': LandingView,
  '#/home': HomeView,
  '#/stories': StoriesView,
  '#/add-story': AddStoryView,
  '#/detail/:id': DetailView,
  '#/login': LoginView,
  '#/register': RegisterView,
  '#/subscribe': SubscribeView,
  '#/favorites': FavoritesView,
  '#/about': AboutView,
  '#/404': NotFoundView,
};

export function initRouter() {
  updateNavLinks();
  window.addEventListener('hashchange', () => {
    updateNavLinks();
    renderPage();
  });
  window.addEventListener('load', () => {
    updateNavLinks();
    renderPage();
  });

  document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    removeToken();
    updateNavLinks();
    window.location.hash = '#/login';
  });
}

function updateNavLinks() {
  const token = getToken();
  const loginLink = document.getElementById('login-link');
  const logoutLink = document.getElementById('logout-link');
  const subscribeLink = document.getElementById('subscribe-link');
  const favoritesLink = document.getElementById('favorites-link');
  const userWelcome = document.getElementById('user-welcome');
  
  if (token) {
    loginLink.style.display = 'none';
    logoutLink.style.display = 'inline';
    if (subscribeLink) subscribeLink.style.display = 'inline';
    if (favoritesLink) favoritesLink.style.display = 'inline';
    
    // Show user welcome message
    if (userWelcome) {
      const userData = getUserData();
      userWelcome.textContent = `Hi, ${userData.name || 'User'}`;
      userWelcome.style.display = 'inline';
    }
  } else {
    loginLink.style.display = 'inline';
    logoutLink.style.display = 'none';
    if (subscribeLink) subscribeLink.style.display = 'none';
    if (favoritesLink) favoritesLink.style.display = 'none';
    if (userWelcome) userWelcome.style.display = 'none';
  }
}

function getUserData() {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : { name: 'User' };
  } catch (error) {
    return { name: 'User' };
  }
}

function renderPage() {
  const hash = window.location.hash || '#/';
  const route = Object.keys(routes).find((key) => {
    const regex = new RegExp(`^${key.replace(':id', '([^/]+)')}$`);
    return regex.test(hash);
  });

  if (route) {
    const ViewClass = routes[route];
    const view = new ViewClass();

    if (route === '#/detail/:id') {
      const match = hash.match(new RegExp(`^${route.replace(':id', '([^/]+)')}$`));
      const id = match ? match[1] : null;
      navigateWithTransition(() => view.init({ id }));
    } else {
      navigateWithTransition(() => view.init());
    }
  } else {
    const notFoundView = new NotFoundView();
    window.location.hash = '#/404';
    navigateWithTransition(() => notFoundView.init());
  }
}