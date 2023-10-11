import axios from 'axios';

const ApiDummy = axios.create({
    baseURL:'https://dummyjson.com',
})

export default ApiDummy