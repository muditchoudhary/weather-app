/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import { reject } from 'lodash';

const Weather = () => {
	const accessKey = '88b60e1429b16a59191816ea76dbe4b9';

	const getCurrentWeather = async (cityName, unit) => {
		const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${accessKey}&units=${unit}`;
		try {
			const response = await fetch(endPoint, { mode: 'cors' });
			const data = await response.text();
			return data;
		} catch (error) {
			return error;
		}
	};

	const getWeatherIcon = async (iconCode) => {
		const endPoint = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
		try {
			const response = await fetch(endPoint, { mode: 'cors' });
			return response;
		} catch (error) {
			return error;
		}
	};

	const getCurrentDate = () => {
		const today = new Date();

		if ((today.getMonth() + 1) < 9 && today.getDate() < 9) {
			return `${today.getFullYear()}-0${today.getMonth() + 1}-0${today.getDate()}`;
		} if ((today.getMonth() + 1) > 9 && today.getDate() <= 9) {
			return `${today.getFullYear()}-${today.getMonth() + 1}-0${today.getDate()}`;
		} if ((today.getMonth() + 1) < 9 && today.getDate() > 9) {
			return `${today.getFullYear()}-0${today.getMonth() + 1}-0${today.getDate()}`;
		}
		return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
	};

	const filterWeather = (data, weatherFormat) => {
		const weatherList = data.list;
		const filteredWeatherDatas = [];
		if (weatherFormat === 'hourly') {
			for (let i = 0; i < weatherList.length; i++) {
				const weatherObj = weatherList[i];
				if (weatherObj.dt_txt.split(' ')[0] === getCurrentDate()) {
					filteredWeatherDatas.push(weatherObj);
				}
			}
		} if (weatherFormat === 'daily') {
			const datesLists = [];
			for (let i = 0; i < weatherList.length; i++) {
				const weatherObj = weatherList[i];
				if (weatherObj.dt_txt.split(' ')[0] !== getCurrentDate() && !datesLists.includes(weatherObj.dt_txt.split(' ')[0])) {
					filteredWeatherDatas.push(weatherObj);
					datesLists.push(weatherObj.dt_txt.split(' ')[0]);
				}
			}
		}

		return filteredWeatherDatas;
	};

	const getWeather = async (cityName, unit, weatherFormat) => {
		const endPoint = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${accessKey}&units=${unit}`;
		let returnValue;
		try {
			const response = await fetch(endPoint, { mode: 'cors' });
			let data = await response.text();
			data = JSON.parse(data);
			if (weatherFormat === 'hourly') {
				returnValue = filterWeather(data, 'hourly');
			} if (weatherFormat === 'daily') {
				returnValue = filterWeather(data, 'daily');
			}
		} catch (error) {
			return error;
		}

		return returnValue;
	};

	return {
		getCurrentWeather,
		getWeatherIcon,
		filterWeather,
		getWeather,
	};
};

export default Weather;
