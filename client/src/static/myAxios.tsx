import axios from 'axios';

const baseURL = 'http://localhost:8000/api/v1'
const token = localStorage.getItem('authToken');

export const privateAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token

  }
})

