import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '@/components/share/NavBar';
import { AuthProvider } from '@/lib/context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
