/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import { reject } from 'lodash';

class Weather {
	accessKey = '';

	constructor(accessKey) {
		this.accessKey = accessKey;
	}

	async getCurrentWeather(cityName, unit) {
		const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${this.accessKey}&units=${unit}`;
		try {
			const response = await fetch(endPoint, { mode: 'cors' });
			const data = await response.text();
			return data;
		} catch (error) {
			return error;
		}
	}

	async getWeatherIcon(iconCode) {
		const endPoint = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
		try {
			const response = await fetch(endPoint, { mode: 'cors' });
			return response;
		} catch (error) {
			return error;
		}
	}

	getCurrentDate() {
		const today = new Date();

		if ((today.getMonth() + 1) < 9 && today.getDate() < 9) {
			return `${today.getFullYear()}-0${today.getMonth() + 1}-0${today.getDate()}`;
		} if ((today.getMonth() + 1) > 9 && today.getDate() <= 9) {
			return `${today.getFullYear()}-${today.getMonth() + 1}-0${today.getDate()}`;
		} if ((today.getMonth() + 1) < 9 && today.getDate() > 9) {
			return `${today.getFullYear()}-0${today.getMonth() + 1}-0${today.getDate()}`;
		}
		return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
	}

	filterTodayHourlyWeather(data) {
		const weatherList = data.list;
		const todayHourlyWeathers = [];
		for (let i = 0; i < weatherList.length; i++) {
			const weatherObj = weatherList[i];
			if (weatherObj.dt_txt.split(' ')[0] === this.getCurrentDate()) {
				todayHourlyWeathers.push(weatherObj);
			}
		}
		return todayHourlyWeathers;
	}

	async getHourlyWeather(cityName, unit) {
		const endPoint = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${this.accessKey}&units=${unit}`;
		try {
			const response = await fetch(endPoint, { mode: 'cors' });
			let data = await response.text();
			data = JSON.parse(data);
			return this.filterTodayHourlyWeather(data);
		} catch (error) {
			return error;
		}
	}
}

export default Weather;
