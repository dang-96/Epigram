import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '@/components/share/NavBar';
import { AuthProvider } from '@/lib/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FixedMenu from '@/components/share/FixedMenu';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
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
