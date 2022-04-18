import axios from 'axios';

let baseUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log('dev');
    baseUrl = 'http://localhost:8080';

} else {
    console.log('prod');
    baseUrl = 'http://glossary-dev.us-east-1.elasticbeanstalk.com/';
}

axios.defaults.baseURL = baseUrl;

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}