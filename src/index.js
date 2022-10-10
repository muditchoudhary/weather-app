import _ from 'lodash';
import './style.css';
import Dom from './modules/dom';
import Weather from './modules/weather';

const weatherApp = Dom;

Dom.main();
Dom.displayNewWeather();

// Adding click listener on the app
const searchBtn = document.querySelector('.search-now');
searchBtn.addEventListener('click', weatherApp.displayNewWeather);
