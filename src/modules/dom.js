/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import { format } from 'date-fns';
import searchIcon from '../Assets/Icons/search.svg';
import Weather from './weather';

const weatherApi = Weather();

const Dom = (() => {
	let data;

	const createHourlyWeatherIconList = async (hourlyWeatherData) => {
		const hourlyWeatherIcons = [];
		for (let i = 0; i < hourlyWeatherData.length; i++) {
			// eslint-disable-next-line no-await-in-loop
			hourlyWeatherIcons.push(await weatherApi.getWeatherIcon(hourlyWeatherData[i].weather[0].icon));
		}

		return hourlyWeatherIcons;
	};

	const displayCurrentTime = (hours, minutes) => {
		const amPM = hours >= 12 ? 'PM' : 'AM';
		const amPmHour = hours > 12 ? hours - 12 : hours;
		// hours = hours < 10 ? `0${hours}` : hours;
		// minutes = minutes < 10 ? `0${date.getMinutes()}` : date.getMinutes();
		const time = `${amPmHour}:${minutes} ${amPM}`;
		return time;
	};

	const clearWeatherWidget = () => {
		const myNode = document.querySelector('.additional-info-body-sect');
		while (myNode.firstChild) {
			myNode.removeChild(myNode.lastChild);
		}
	};

	const createDailyWeatherWidget = async (dailyWeatherData, weatherIconList) => {
		clearWeatherWidget();
		const bodySection = document.querySelector('.additional-info-body-sect');

		console.log(dailyWeatherData);

		for (let i = 0; i < dailyWeatherData.length; i++) {
			const weatherObj = dailyWeatherData[i];

			const mainDivBox = document.createElement('div');
			mainDivBox.classList.add('weathers-card');

			const dateText = document.createElement('p');
			dateText.textContent = '9 Oct';

			const weatherIcon = document.createElement('img');
			weatherIcon.src = weatherIconList[i].url;

			const tempText = document.createElement('p');
			tempText.classList.add('hourly-temp-text');
			tempText.textContent = Math.round(weatherObj.main.temp);

			// appending the parent element
			mainDivBox.append(dateText, weatherIcon, tempText);
			bodySection.append(mainDivBox);
		}
	};

	const createHourlyWeatherWidget = async (hourlyWeatherData, weatherIconList) => {
		clearWeatherWidget();
		const bodySection = document.querySelector('.additional-info-body-sect');

		for (let i = 0; i < hourlyWeatherData.length; i++) {
			const weatherObj = hourlyWeatherData[i];

			const mainDivBox = document.createElement('div');
			mainDivBox.classList.add('weathers-card');

			const timeText = document.createElement('p');
			const time = weatherObj.dt_txt.split(' ')[1].split(':');
			timeText.textContent = displayCurrentTime(time[0], time[1]);

			const weatherIcon = document.createElement('img');
			weatherIcon.src = weatherIconList[i].url;

			const tempText = document.createElement('p');
			tempText.classList.add('hourly-temp-text');
			tempText.textContent = Math.round(weatherObj.main.temp);

			// appending the parent element
			mainDivBox.append(timeText, weatherIcon, tempText);
			bodySection.append(mainDivBox);
		}
	};

	const showHourlyWeather = async () => {
		const hourlyWeatherData = await weatherApi.getWeather(data.name, 'metric', 'hourly');
		const weatherIconList = await createHourlyWeatherIconList(hourlyWeatherData);
		createHourlyWeatherWidget(hourlyWeatherData, weatherIconList);
	};

	const showDailyWeather = async () => {
		const dailyWeatherData = await weatherApi.getWeather(data.name, 'metric', 'daily');
		const weatherIconList = await createHourlyWeatherIconList(dailyWeatherData);
		createDailyWeatherWidget(dailyWeatherData, weatherIconList);
	};

	const displayNewWeather = async () => {
		const cityName = document.querySelector('.city-name-field').value;

		// Getting date from the apis
		data = await weatherApi.getCurrentWeather(cityName, 'metric');
		data = JSON.parse(data);
		let weatherIcon = await weatherApi.getWeatherIcon(data.weather[0].icon);
		weatherIcon = weatherIcon.url;
		const hourlyWeatherData = await weatherApi.getWeather(cityName, 'metric', 'hourly');

		// Updating values in the dom
		document.querySelector('.city').textContent = data.name;
		document.querySelector('.date-text').textContent = format(new Date(), 'PPP');
		document.querySelector('.weather-icon').src = weatherIcon;
		document.querySelector('.weather-desc').textContent = data.weather[0].main;
		document.querySelector('.current-temp-text').textContent = Math.round(data.main.temp);
		document.querySelector('.max-temp').textContent = Math.round(data.main.temp_max);
		document.querySelector('.min-temp').textContent = Math.round(data.main.temp_min);

		showHourlyWeather();
		// const weatherIconList = await createHourlyWeatherIconList(hourlyWeatherData);
		// createHourlyWeatherWidget(data.name, hourlyWeatherData, weatherIconList);

		// console.log(data);
		console.log(hourlyWeatherData);
	};

	const createAdditionalInfoWin = () => {
		const div = document.createElement('div');

		const topBar = document.createElement('div');

		const bodySection = document.createElement('div');
		bodySection.classList.add('additional-info-body-sect');
		topBar.classList.add('top-bar');

		const topBarOptions = ['Hourly', 'Daily', 'Wind', 'Air Quality'];
		const methodTopBarOptionsCall = [showHourlyWeather, showDailyWeather, showDailyWeather, showDailyWeather];
		let i = 0;
		for (const option of topBarOptions) {
			const optionText = document.createElement('p');
			optionText.classList.add(option.split(' ').join('-').toLocaleLowerCase());
			optionText.addEventListener('click', methodTopBarOptionsCall[i]);
			optionText.textContent = option;
			topBar.appendChild(optionText);
			i += 1;
		}

		div.append(topBar, bodySection);
		return div;
	};

	const createDisplayInfoWin = () => {
		const div = document.createElement('div');
		div.classList.add('display-window');

		const divOne = document.createElement('div');

		const cityNameText = document.createElement('p');
		cityNameText.classList.add('city');
		cityNameText.textContent = 'Jaipur';

		const dateText = document.createElement('p');
		dateText.classList.add('date-text');
		dateText.textContent = 'September 20, 2022';

		const weatherImg = document.createElement('img');
		weatherImg.classList.add('weather-icon');
		weatherImg.src = 'https://openweathermap.org/img/wn/10d@2x.png';

		const weatherDescriptionText = document.createElement('p');
		weatherDescriptionText.classList.add('weather-desc');
		weatherDescriptionText.textContent = 'Cloudy';

		divOne.append(cityNameText, dateText, weatherImg, weatherDescriptionText);

		const divTwo = document.createElement('div');

		const currentTempText = document.createElement('p');
		currentTempText.classList.add('current-temp-text');
		currentTempText.textContent = '28 C';

		const minMaxTempDiv = document.createElement('div');
		minMaxTempDiv.classList.add('minmax-temp-div');
		const maxTempText = document.createElement('p');
		maxTempText.classList.add('max-temp');
		maxTempText.textContent = '31 C';
		const minTempText = document.createElement('p');
		minTempText.classList.add('min-temp');
		minTempText.textContent = '24 c';

		minMaxTempDiv.append(maxTempText, minTempText);

		divTwo.append(currentTempText, minMaxTempDiv);

		div.append(divOne, divTwo);

		return div;
	};

	const createSearchBar = () => {
		const div = document.createElement('div');
		div.classList.add('search-bar');

		const searchInput = document.createElement('input');
		searchInput.classList.add('city-name-field');
		searchInput.placeholder = 'India';
		const searchBtn = document.createElement('img');
		searchBtn.classList.add('search-now');
		searchBtn.src = searchIcon;

		div.append(searchInput, searchBtn);

		return div;
	};

	const createApp = () => {
		const appWindow = document.createElement('div');
		appWindow.classList.add('app-window');

		appWindow.append(createSearchBar(), createDisplayInfoWin(), createAdditionalInfoWin());

		return appWindow;
	};

	const main = () => {
		document.body.append(createApp());
	};

	return {
		main,
		displayNewWeather,
	};
})();

Dom.main();

export default Dom;
