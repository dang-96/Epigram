import Epigram from '@/components/share/Epigram';
import FixedMenu from '@/components/share/FixedMenu';
import { fetchNewEpigram } from '@/lib/apis/epigram';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import { EpigramType } from '@/lib/types/type';
import { useInfiniteQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FeedPage() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['newEpigramFeed'],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await fetchNewEpigram({ limit: 6, cursor: pageParam });

        return res;
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      initialPageParam: 0,
    });

  // 무함 스크롤
  const { totalCount, isMoreButton, scrollLoading } = useInfiniteScroll({
    data,
    fetchNextPage,
    hasNextPage,
  });

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러...</div>;
  }

  return (
    <div className="relative h-full min-h-screen bg-background py-[120px]">
      <h2 className="mx-auto mb-10 w-full max-w-[1200px] text-2xl font-semibold text-black-600">
        피드
      </h2>
      <div
        className={clsx(
          'mx-auto grid w-full max-w-[1200px] gap-x-[30px] gap-y-[40px]',
          data?.pages && totalCount > 0 && 'grid-cols-2'
        )}
      >
        {data?.pages && totalCount > 0 ? (
          data?.pages?.flatMap(({ list }) =>
            list?.map((epigram: EpigramType) => {
              return (
                <Link href={`/feed/${epigram.id}`} key={epigram.id}>
                  <Epigram data={epigram} height={260} />
                </Link>
              );
            })
          )
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/images/not-content.png"
              width={144}
              height={144}
              alt="컨텐츠 없는 경우 아이콘"
            />
            <p className="text-center text-xl">
              작성된 에피그램 피드가 없습니다.
            </p>
          </div>
        )}
      </div>
      {isMoreButton && (
        <div className="absolute bottom-10 left-[50%] flex translate-x-[-50%] flex-col items-center justify-center gap-1 text-base font-semibold">
          {/* <span className="text-blue-400">피드 더보기</span> */}
          {scrollLoading ? (
            <span className="text-xl text-blue-400">. . .</span>
          ) : (
            <Image
              src="/icons/scroll-icon.svg"
              width={34}
              height={34}
              alt="스크롤 아이콘"
            />
          )}
        </div>
      )}
      <FixedMenu />
    </div>
  );
}
