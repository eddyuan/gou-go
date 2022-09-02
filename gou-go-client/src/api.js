import axios from 'axios';
const ax = axios.create({
  baseUrl: 'http://127.0.0.1:3000/api/v1/',
});

const server = {
  getSitters() {
    return axios.get('http://127.0.0.1:3000/api/v1/sitters');
  },
};

export default server;
