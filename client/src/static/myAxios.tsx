import axios from 'axios';

const baseURL = 'http://localhost:8000'

export const publicAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
})

