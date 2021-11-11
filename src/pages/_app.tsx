import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';
import enUS from '../../translations/en.json'; // ja.json


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IntlProvider messages={enUS} locale='en' defaultLocale='en'>
      <Component {...pageProps} />
    </IntlProvider>
  );
}
export default MyApp;
