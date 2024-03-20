import { makeAutoObservable } from 'mobx';
import axios from 'axios';

import { User } from '../models/User';
import AuthService from '../services/Auth';
import { AuthResponse } from '../models/AuthResponse';
import { API_URL } from '../../config';
import { Realty } from '~/src/models/Realty';
import { SignInParamsType } from '../types';
import { Location } from '../models/Location';
import AccountService from '../services/Account';
import LocationService from '../services/Location';

export default class Store {
    user = {} as User;
    isAuth = false;
    isLoading = false;
    realties = [] as Realty[];
    locations = [] as Location[];

    constructor() {
        makeAutoObservable(this);
    }

    hydrate(initialState) {
        if (!initialState) {
            return;
        }

        this.setLocations(initialState.locations);
        this.setRealties(initialState.realties);
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

    setLocations(locations) {
        this.locations = locations;
    }

    getRealties = () => this.realties;

    async signUp(email: string, password: string) {
        try {
            const response = await AuthService.signUp(email, password);

            if (response.status !== 200) {
                return;
            }

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

            if (response.status !== 200) {
                return;
            }

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

    async handleLike(id) {
        if (this.user.favorites.includes(id)) {
            this.removeFavorite(id);
        } else {
            this.addFavorite(id);
        }
    }

    async addFavorite(id) {
        const oldUser = {...this.user};

        this.setUser({
            ...oldUser,
            favorites: [id, ...oldUser.favorites],
        });

        AccountService.addFavorite({id})
            .catch(error => {
                console.error(error.message);
                this.setUser(oldUser);
            })
    }

    async removeFavorite(id) {
        const oldUser = {...this.user};

        this.setUser({
            ...oldUser,
            favorites: oldUser.favorites.filter(favId => favId !== id),
        });

        AccountService.removeFavorite(id)
            .catch(error => {
                console.error(error.message);
                this.setUser(oldUser);
            })
    }

    getFavorites() {
        if (!this.isLoading && this.isAuth) {
            const realties = this.realties.filter((realty) => this.user?.favorites?.includes(realty._id));
            console.log('realties', this.realties);
            console.log('favs', this.user.favorites);

            return realties;
        }
    }

    isFavorite(id) {
        if (!this.isLoading && this.isAuth) {
            return this.user?.favorites?.includes(id);
        }
    }

    async addLocation(location) {
        LocationService.createLocation(location).then(res => {
            if (res?.status === 200) {
                this.setLocations(res.data);
            }
        });
    }

    async updateLocation(id, name) {
        LocationService.updateLocation(
            id,
            name,
        ).then(res => {
            if (res?.status === 200) {
                this.setLocations(res.data);
            }
        });
    }

    async deleteLocation(id) {
        LocationService.deleteLocation(id)
            .then(res => res?.status === 200 && this.setLocations(res.data));
    }

    async fetchRealties() {
        fetch(`${API_URL}/realties`)
            .then(res => res.json()
                .then(realties => {
                    this.setRealties(realties);
                })
            ).catch(error => {
                console.error(error.message, error);
            });
    }

    async fetchLocations() {
        fetch(`${API_URL}/locations`)
            .then(res => res.json()
                .then(locations => {
                    this.setLocations(locations);
                })
        ).catch(error => {
            console.error(error.message, error);
        });
    }
}
