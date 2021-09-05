import axios from 'axios';
 
const instance = axios.create({
    baseURL: 'http://localhost:4000' // API URL
    // baseURL: 'http://localhost:9229' // API URL
})

export default instance;;