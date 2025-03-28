import Link from 'next/link';
import clsx from 'clsx';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNewEpigram } from '@/lib/apis/epigram';
import { EpigramType } from '@/lib/types/type';
import Epigram from '../share/Epigram';
import { useEffect } from 'react';
import { useLoadingStore } from '@/lib/store/useLoadingStore';
import Loading from '../share/Loading';

interface NewEpigramProps {
  marginBottom?: string;
}

export default function NewEpigramList({ marginBottom }: NewEpigramProps) {
  const queryClient = useQueryClient();
  const { setAllLoading } = useLoadingStore();
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['newEpigram'],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await fetchNewEpigram({ limit: 3, cursor: pageParam });
        return res;
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      initialPageParam: 0,
    });
  // 더보기 갯수 최대 10개로 제한
  const MAX_ITEMS = 10;
  const totalItems =
    data?.pages?.reduce((acc, page) => acc + page?.list?.length, 0) ?? 0;
  const isMoreButton = totalItems < MAX_ITEMS && hasNextPage;

  useEffect(() => {
    if (!isLoading) {
      setAllLoading(false);
    }
  }, []);

  useEffect(() => {
    queryClient.resetQueries<any>(['newEpigram']);
  }, []);

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
      {isLoading ? (
        <Loading height={620} width={640} />
      ) : (
        <>
          {data?.pages?.flatMap(({ list }) =>
            list?.map((epigram: EpigramType) => {
              return <Epigram key={epigram.id} data={epigram} />;
            })
          )}

          <div className="flex justify-center">
            {isMoreButton ? (
              <button
                type="button"
                onClick={() => fetchNextPage()}
                className="flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] border-line-200 text-xl font-medium text-blue-500"
              >
                + 에피그램 더보기
              </button>
            ) : (
              <Link
                href="/feed"
                className="flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] border-line-200 text-xl font-medium text-blue-500"
              >
                + 전체 에피그램 보기
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
