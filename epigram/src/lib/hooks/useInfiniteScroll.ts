import { useEffect, useState } from 'react';

interface useInfiniteScrollProps {
  data: any;
  hasNextPage: boolean;
  fetchNextPage: () => any;
}

export const useInfiniteScroll = ({
  data,
  hasNextPage,
  fetchNextPage,
}: useInfiniteScrollProps) => {
  const [scrollLoading, setScrollLoading] = useState<boolean>(false);
  const totalCount = data?.pages[0].totalCount;
  const currentCount =
    data?.pages?.reduce((acc: any, page: any) => acc + page?.list.length, 0) ??
    0;
  const isMoreButton = currentCount >= Number(totalCount) ? false : hasNextPage;

  useEffect(() => {
    if (hasNextPage) {
      const handleScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 1
        ) {
          if (!scrollLoading) {
            setScrollLoading(true);
            fetchNextPage().finally(() => setScrollLoading(false));
          }
        }
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [hasNextPage, scrollLoading]);

  return { totalCount, isMoreButton, scrollLoading };
};
