import axios, { AxiosError } from 'axios';
import { getAuthToken } from './auth-token';

const baseUrl = import.meta.env.VITE_API_URL;

if (!baseUrl) {
    throw new Error('Please provide VITE_API_URL environment variable');
}

export const http = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

http.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

http.interceptors.response.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

export type ApiValidationError = {
    message: string,
    errors: Array<{ path: string, message: string }>
}

export function isValidationError<T = unknown>(error: unknown): error is AxiosError<T>{
    return axios.isAxiosError(error)
}
