import { createContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite';

import Store from './store/Store';
import { GOOGLE_CLIENT_ID } from '../config';

export interface State {
    store: Store;
}

const store = new Store();
export const Context = createContext<State>({ store })

function AppWrapper({ children }) {
    useEffect(
        () => {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: response => store.signInWithGoogle(response.credential),
            })

            if (localStorage.getItem('token')) {
                store.checkAuth();
            }

            if (!store.isAuth && !store.isLoading) {
                google.accounts.id.prompt();
            }
        },
        [],
    );

    return (
        <Context.Provider value={{ store }}>
            { children }
        </Context.Provider>
    );
}

export default observer(AppWrapper);
