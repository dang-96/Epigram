import Link from 'next/link';
import Epigram from '../share/Epigram';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { fetchNewEpigram } from '@/lib/apis/epigram';
import { EpigramType } from '@/lib/types/type';

export default function NewEpigram() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['newEpigram'],
    queryFn: async () => {
      const res = await fetchNewEpigram({ limit: 3, cursor: 0 });
      return res;
    },
  });

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러...</div>;
  }

  return (
    <>
      {data.list.map((epigram: EpigramType) => {
        return <Epigram key={epigram.id} data={epigram} />;
      })}
    </>
  );
}
