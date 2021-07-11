import Router from 'next/router';
import NProgress from 'nprogress';
import Page from '../components/Page';
import { BooksStateProvider } from '../lib/booksState';
import { ModalStateProvider } from '../lib/modalState';
import '../styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return (
        <BooksStateProvider>
            <ModalStateProvider>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </ModalStateProvider>
        </BooksStateProvider>
    );
}

export default MyApp;
