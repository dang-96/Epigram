import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '@/components/share/NavBar';
import { AuthProvider } from '@/lib/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavBar />
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
