class GeoCoding {
	accessKey = '';

	constructor(accessKey) {
		this.accessKey = accessKey;
	}

	async reverseGeoCode(long, lati) {
		try {
			const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lati}&lon=${long}&appid=${this.accessKey}`, { mode: 'cors' });
			return response.text();
		} catch (error) {
			return error;
		}
	}
}

export default GeoCoding;
