import { createContext } from 'react';
import Store from './Store';

export interface State {
    store: Store;
}

const store = new Store();
store.fetchLocations();
store.fetchRealties();

export const Context = createContext<State>({ store });

const ContextProvider = ({ children }) => {
    return (
        <Context.Provider value={{ store }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;
