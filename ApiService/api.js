import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.107.198.16:3000'
});

export default api;