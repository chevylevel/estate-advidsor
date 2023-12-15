import { AxiosResponse } from 'axios';

import api from '../http';
import { AuthResponse } from '../models/AuthResponse';

export default class AuthService {
    static async signUp(
        email: string,
        password: string
    ): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/signup', { email, password });
    }

    static async signIn(credentials: SignInParamsType): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/signin', credentials);
    }

    static async signInWithGoogle(token: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/signin-with-google', { token });
    }

    static async signOut(): Promise<void> {
        return api.get('/signout');
    }
}
