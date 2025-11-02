import axios from "axios";

// Base da URL: https://api.themoviedb.org/3/
// URL da API: /movie/now_playing?api_key=d38f1e9aa4722184f19a90fb17444e91 

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;