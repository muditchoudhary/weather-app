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
}

export default Weather;
