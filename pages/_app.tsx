import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Script from 'next/script';
import Head from 'next/head';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/global.css';

import { GOOGLE_CLIENT_ID } from '../config';
import ContextProvider, { Context } from '~/src/app/Context';

import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === "undefined");


function App({ Component, pageProps }) {
    const { store } = useContext(Context);

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
        <>
            <Head>
                <title>Estate Adviser</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>

            <Script
                src={'https://accounts.google.com/gsi/client'}
                type={'application/javascript'}
                strategy={'beforeInteractive'}
            />

            <ContextProvider>
                <Component {...pageProps} />
            </ContextProvider>
        </>
    );
}

export default observer(App);
