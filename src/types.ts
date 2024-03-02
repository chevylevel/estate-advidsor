import { Realty } from './models/Realty';

export type SignInParamsType = {
    email: string,
    password: string,
}

export type NumberRealtyField = {
    [K in keyof Realty]: Realty[K] extends number ? K : never
}[keyof Realty];
