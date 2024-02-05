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

export const fetchGame = async (gameId) => {
	try {
		console.log("Sending request");
		const response = await apiService.get(`/game?game_id=${gameId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
}

export const makeAction = async (gameId, action) => {
	try {
		console.log("Sending request");
		const response = await apiService.put(`/action?game_id=${gameId}&action=${action}`);
		return response.data;
	} catch (error) {
		throw error;
	}
}