import Link from 'next/link';
import Epigram from '../share/Epigram';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { fetchNewEpigram } from '@/lib/apis/epigram';
import { EpigramType } from '@/lib/types/type';

interface NewEpigramProps {
  marginBottom?: string;
}

export default function NewEpigram({ marginBottom }: NewEpigramProps) {
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
    <div
      className={clsx(
        marginBottom ? marginBottom : 'mb-[140px]',
        'mx-auto w-full max-w-[640px]'
      )}
    >
      <h2 className="mb-10 text-2xl font-semibold text-black-600">
        최신 에피그램
      </h2>
      {data.list.map((epigram: EpigramType) => {
        return <Epigram key={epigram.id} data={epigram} />;
      })}
      <div className="flex justify-center">
        <Link
          href="/"
          className="flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] border-line-200 text-xl font-medium text-blue-500"
        >
          + 에프기램 더보기
        </Link>
      </div>
    </div>
  );
}
