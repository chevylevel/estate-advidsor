import { AxiosResponse } from 'axios';

import api from '../http';
import { useContext } from 'react';
import { Context } from '../AppWrapper';
import { Realty } from '../models/Realty';
import { User } from '../models/User';

export default class AccountService {
    static async getFavorites(): Promise<AxiosResponse<Realty[]>> {
        return api.get<Realty[]>('/favorites');
    }

    static async addFavorite(payload): Promise<AxiosResponse<User>> {
        return api.post<User>('/favorite', payload);
    }

    static async removeFavorite(id): Promise<AxiosResponse<User>> {
        return api.delete<User>(`/favorite/${id}`);
    }
}
