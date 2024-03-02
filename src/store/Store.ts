import { makeAutoObservable } from 'mobx';
import axios from 'axios';

import { User } from '../models/User';
import AuthService from '../services/Auth';
import { AuthResponse } from '../models/AuthResponse';
import { API_URL } from '../../config';
import { Realty } from '~/src/models/Realty';
import { SignInParamsType } from '../types';

export default class Store {
    user = {} as User;
    isAuth = false;
    isLoading = false;
    realties = [] as Realty[];

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    setUser(user: User) {
        this.user = user;
    }

    setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    setRealties(realties) {
        this.realties = realties;
    }

    getRealties = () => this.realties;

    async signUp(email: string, password: string) {
        try {
            const response = await AuthService.signUp(email, password);

            localStorage.setItem('token', response?.data?.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.error(error?.response?.data?.message);
        }
    }

    async signIn(credentials: SignInParamsType) {
        try {
            const response = await AuthService.signIn(credentials);

            localStorage.setItem('token', response?.data?.accessToken);

            this.setAuth(true);
            this.setUser(response?.data?.user);
        } catch (error) {
            console.error(error?.response?.data?.message)
        }
    }

    async signInWithGoogle(token) {
        try {
            const response = await AuthService.signInWithGoogle(token);

            localStorage.setItem('token', response?.data?.accessToken);

            this.setAuth(true);
            this.setUser(response?.data?.user);
        } catch (error) {
            console.error(error?.response?.data?.message)
        }
    }

    async signOut() {
        try {
            await AuthService.signOut();

            localStorage.removeItem('token');

            this.setAuth(false);
            this.setUser({} as User);
        } catch (error) {
            console.error(error?.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            this.setIsLoading(true);

            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });

            localStorage.setItem('token', response?.data?.accessToken);

            this.setAuth(true);
            this.setUser(response?.data?.user);

        } catch (error) {
            console.error(error?.response?.data?.message);
        } finally {
            this.setIsLoading(false);
        }
    }
}
