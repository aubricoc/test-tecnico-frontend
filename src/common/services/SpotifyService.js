import axios from "axios";
import config from "../../config";

export default class SpotifyService {

	static getToken = async () => {
		const basicToken = Buffer.from(config.api.clientId + ':' + config.api.clientSecret).toString('base64');
		const {data} = await axios.post(config.api.authUrl, 'grant_type=client_credentials', {
			headers: {
				'Authorization': 'Basic ' + basicToken,
				'Content-type': 'application/x-www-form-urlencoded'
			}
		})
		return data.access_token;
	};

	static fetchNewReleases = async token => {
		const {data} = await axios.get(config.api.baseUrl + '/browse/new-releases', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		return data.albums.items
	};

	static fetchFeaturedPlaylists = async token => {
		const {data} = await axios.get(config.api.baseUrl + '/browse/featured-playlists', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		return data.playlists.items
	};

	static fetchCategories = async token => {
		const {data} = await axios.get(config.api.baseUrl + '/browse/categories', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		return data.categories.items
	};
}
