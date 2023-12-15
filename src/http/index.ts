import axios from 'axios';
import { AuthResponse } from '../models/AuthResponse';

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.HOST,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
})

api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        console.log('error', error);

        if (error?.response?.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.get<AuthResponse>(`${process.env.HOST}/refresh`, { withCredentials: true });

                localStorage.setItem('token', response?.data?.accessToken);

                return api.request(originalRequest);
            } catch (error) {
                console.log(error, 'не авторизован!');
            }

            throw error;
        }
    }
);

export default api;
