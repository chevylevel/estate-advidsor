import Script from 'next/script'
import Head from 'next/head'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../styles/global.css';

import AppWrapper from '../src/AppWrapper';

export default function App({ Component, pageProps }) {
  return (
    <>
        <Head>
            <title>Estate Adviser</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <Script
            src="https://accounts.google.com/gsi/client"
            type="application/javascript"
            strategy="beforeInteractive"
        />

        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    </>
  );
}
