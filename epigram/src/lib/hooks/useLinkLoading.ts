import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export default function useLinkLoading() {
  const router = useRouter();
  const [linkLoading, setLinkLoading] = useState<boolean>(false);

  useEffect(() => {
    const pageMoveStart = () => {
      setLinkLoading(true);
    };
    const pageMoveComplete = () => {
      setLinkLoading(false);
    };

    router.events.on('routeChangeStart', pageMoveStart);
    router.events.on('routeChangeComplete', pageMoveComplete);
    router.events.on('routeChangeError', pageMoveComplete);
    return () => {
      router.events.off('routeChangeStart', pageMoveComplete);
      router.events.off('routeChangeComplete', pageMoveComplete);
      router.events.off('routeChangeError', pageMoveComplete);
    };
  }, [router]);

  return { linkLoading };
}
