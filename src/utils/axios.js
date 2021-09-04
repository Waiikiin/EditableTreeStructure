import axios from 'axios';
 
const instance = axios.create({
    baseURL: 'https://us-central1-basiccrud-b4521.cloudfunctions.net/api/' // API URL
})

export default instance;;