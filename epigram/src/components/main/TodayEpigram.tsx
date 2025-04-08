import { useQuery } from '@tanstack/react-query';
import Epigram from '../share/Epigram';
import { fetchTodayEpigram } from '@/lib/apis/epigram';
import { useLoadingStore } from '@/lib/store/useLoadingStore';
import { useEffect } from 'react';
import Loading from '../share/Loading';
import clsx from 'clsx';

export default function TodayEpigram() {
  const { setAllLoading } = useLoadingStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todayEpigram'],
    queryFn: async () => {
      const res = await fetchTodayEpigram();
      return res?.data;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setAllLoading(false);
    }
  }, [isLoading]);

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <div
      className={clsx('mx-auto mb-14 w-full max-w-[640px]', 'xl:mb-[140px]')}
    >
      <h2
        className={clsx(
          'mb-6 text-base font-semibold text-black-600',
          'xl:mb-10 xl:text-2xl'
        )}
      >
        오늘의 에피그램
      </h2>
      {isLoading ? (
        <Loading height={160} width={640} />
      ) : (
        <Epigram data={data} />
      )}
    </div>
  );
}
