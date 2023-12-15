import Script from 'next/script'

import '../styles/global.css';
import AppWrapper from '../src/AppWrapper';

export default function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />

      <Script
        src="https://accounts.google.com/gsi/client"
        type="application/javascript"
        strategy="beforeInteractive"
      />
    </AppWrapper>
  );
}
