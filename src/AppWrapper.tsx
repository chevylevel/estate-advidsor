import { createContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite';

import Store from './store/Store';

export interface State {
    store: Store;
}

const store = new Store();
export const Context = createContext<State>({ store })

function AppWrapper({ children }) {
    useEffect(
        () => {
            google.accounts.id.initialize({
                client_id: '756758641886-8sggl19esej4fg44bu5jgatdaagrrc9l.apps.googleusercontent.com',
                callback: response => store.signInWithGoogle(response.credential),
            })

            google.accounts.id.prompt();

            if (localStorage.getItem('token')) {
                store.checkAuth();
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
