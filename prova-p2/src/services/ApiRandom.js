import axios from 'axios';

const ApiRandom = axios.create({ 
    baseURL: 'https://randomuser.me/api',
    
})

export default ApiRandom;