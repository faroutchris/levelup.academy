import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import globalStyles from '../components/GlobalStyles';
import Layout from '../components/LayoutApp';
import queryClientInstance from '../config/query-client';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  globalStyles();
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
