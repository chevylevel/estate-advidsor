import { AxiosResponse } from 'axios';

import { User } from '../models/User';
import api from '../http';

export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<User[]>> {
        return api.get<User[]>('/users');
    }
}
