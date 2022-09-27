import _ from 'lodash';
import './style.css';
import Dom from './classes/dom';
import Weather from './classes/weather';

const weatherApp = new Dom();
const weatherApi = new Weather('88b60e1429b16a59191816ea76dbe4b9');

// Adding click listener on the app
const searchBtn = document.querySelector('.search-now');
searchBtn.addEventListener('click', weatherApp.displayNewWeather);
