import '../styles/main.scss';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from '../components/Layout';
import queryClientInstance from '../config/query-client';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
