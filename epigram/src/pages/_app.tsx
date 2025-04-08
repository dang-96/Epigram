import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import NavBar from '@/components/share/NavBar';
import { AuthProvider } from '@/lib/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FixedMenu from '@/components/share/FixedMenu';
import useLinkLoading from '@/lib/hooks/useLinkLoading';
import Loading from '@/components/share/Loading';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { linkLoading } = useLinkLoading();

  if (linkLoading) {
    return <Loading width={'100%'} height={'100vh'} />;
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavBar />
          <Component {...pageProps} />
          <FixedMenu />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
