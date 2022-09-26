/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import searchIcon from '../Assets/Icons/search.svg';

class Dom {
	constructor() {
		this.main();
	}

	main() {
		document.body.append(this.createApp());
	}

	createApp() {
		const appWindow = document.createElement('div');

		appWindow.append(this.createSearchBar(), this.createDisplayInfoWin(), this.createAdditionalInfoWin());

		return appWindow;
	}

	createSearchBar() {
		const div = document.createElement('div');
		div.classList.add('search-bar');

		const searchInput = document.createElement('input');
		searchInput.placeholder = 'India';
		const searchBtn = document.createElement('img');
		searchBtn.src = searchIcon;

		div.append(searchInput, searchBtn);

		return div;
	}

	createDisplayInfoWin() {
		const div = document.createElement('div');
		div.classList.add('display-window');

		const divOne = document.createElement('div');

		const cityNameText = document.createElement('p');
		cityNameText.textContent = 'Jaipur';

		const dateText = document.createElement('p');
		dateText.textContent = 'September 20, 2022';

		const weatherImg = document.createElement('img');
		weatherImg.src = 'https://openweathermap.org/img/wn/10d@2x.png';

		const weatherDescriptionText = document.createElement('p');
		weatherDescriptionText.textContent = 'Cloudy';

		divOne.append(cityNameText, dateText, weatherImg, weatherDescriptionText);

		const divTwo = document.createElement('div');

		const currentTempText = document.createElement('p');
		currentTempText.classList.add('current-temp-text');
		currentTempText.textContent = '28 C';

		const minMaxTempDiv = document.createElement('div');
		minMaxTempDiv.classList.add('minmax-temp-div');
		const maxTempText = document.createElement('p');
		maxTempText.textContent = '31 C';
		const minTempText = document.createElement('p');
		minTempText.textContent = '24 c';

		minMaxTempDiv.append(maxTempText, minTempText);

		divTwo.append(currentTempText, minMaxTempDiv);

		div.append(divOne, divTwo);

		return div;
	}

	createAdditionalInfoWin() {
		const div = document.createElement('div');

		const topBar = document.createElement('div');
		topBar.classList.add('top-bar');

		const topBarOptions = ['Hourly', 'Daily', 'Wind', 'Air Quality'];
		for (const option of topBarOptions) {
			const optionText = document.createElement('p');
			optionText.classList.add(option.split(' ').join('-').toLocaleLowerCase());
			optionText.textContent = option;
			topBar.appendChild(optionText);
		}

		div.append(topBar);
		return div;
	}
}

export default Dom;
