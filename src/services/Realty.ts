import { AxiosResponse } from 'axios';

import api from '../http';
import { RealtyData } from '../models/Realty';

export default class RealtyService {
    static async createRealty(payload): Promise<AxiosResponse<RealtyData>> {
        return api.post<RealtyData>('/realty', payload);
    }

    static async updateRealty(id, payload): Promise<AxiosResponse<RealtyData>> {
        return api.put<RealtyData>(`/realty/${id}`, payload);
    }

    static async deleteRealty(id): Promise<AxiosResponse<RealtyData>> {
        return api.delete<RealtyData>(`/realty/${id}`);
    }

    static async getAll(ids): Promise<AxiosResponse<RealtyData>> {
        return api.get<RealtyData>(`/realties`, ids);
    }

    static async getById(id): Promise<AxiosResponse<RealtyData>> {
        return api.get<RealtyData>(`/realty/${id}`);
    }
}
