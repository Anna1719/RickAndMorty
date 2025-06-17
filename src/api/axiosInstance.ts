import axios from "axios";

const API_URL = "https://rickandmortyapi.com";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
