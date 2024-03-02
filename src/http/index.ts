import axios from 'axios';
import { AuthResponse } from '../models/AuthResponse';
import { API_URL } from '../../config';

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
})

api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        console.error('error 1', error);

        if (error?.response?.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });

                localStorage.setItem('token', response?.data?.accessToken);

                return api.request(originalRequest);
            } catch (error) {
                console.error(error, 'не авторизован!');
            }

            throw error;
        }
    }
);

export default api;
