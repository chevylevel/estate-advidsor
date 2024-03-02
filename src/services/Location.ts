import { AxiosResponse } from 'axios';

import api from '../http';
import { Location } from '../models/Location';

export default class LocationService {
    static async createLocation(payload): Promise<AxiosResponse<Location>> {
        return api.post<Location>('/location', payload);
    }

    static async updateLocation(id, name): Promise<AxiosResponse<Location>> {
        return api.put<Location>(`/location/${id}`, { name });
    }

    static async deleteLocation(id): Promise<AxiosResponse<Location>> {
        return api.delete<Location>(`/location/${id}`);
    }
}
