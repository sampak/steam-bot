import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:4100/v1',
  headers: {
    'content-type': 'application/json',
  },
});

export interface ErrorProps {
  statusCode: number;
  message: string;
  error: string;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.authorization = '1234'
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    throw error;
  }
);
