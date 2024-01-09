// apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const registerGame = async () => {
	try {
		console.log("Sending request");
		const response = await apiService.put('/game');
		return response.data;
	} catch (error) {
		throw error;
	}
}

export const fetchGame = async () => {
	try {
		console.log("Sending request");
		const response = await apiService.get('/game');
		return response.data;
	} catch (error) {
		throw error;
	}
}