import Epigram from '@/components/share/Epigram';
import FixedMenu from '@/components/share/FixedMenu';
import Loading from '@/components/share/Loading';
import { fetchNewEpigram } from '@/lib/apis/epigram';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import { EpigramType } from '@/lib/types/type';
import { useInfiniteQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FeedPage() {
  const GRID = '/icons/filter-grid-icon.svg';
  const LIST = '/icons/filter-list-icon.svg';
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
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [feedType, setFeedType] = useState<'list' | 'grid'>('list');

  // 피드 반응형&필터별 상태 지정
  const feedStyle = (() => {
    if (isMobile) {
      return feedType === 'list'
        ? 'grid-cols-1 gap-y-[16px]'
        : 'grid-cols-2 gap-x-[16px] gap-y-[20px]';
    }
    return 'grid-cols-2 sm:gap-x-[30px] sm:gap-y-[40px]';
  })();

  // 무함 스크롤
  const { totalCount, isMoreButton, scrollLoading } = useInfiniteScroll({
    data,
    fetchNextPage,
    hasNextPage,
  });

  // 필터 변경 기능
  const feedTypeToggle = () => {
    setFeedType((prev) => (prev === 'list' ? 'grid' : 'list'));
  };

  // 브라우저 사이즈에 따라 pc, mo 상태 지정
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (isMobile === null) return null;

  if (isError) {
    return <div>에러...</div>;
  }

  return (
    <div
      className={clsx(
        'relative h-full min-h-screen bg-background px-[10px] py-8',
        'xl:px-5 xl:py-[120px]'
      )}
    >
      <div
        className={clsx(
          'mb-6 flex w-full max-w-[1200px] items-center justify-between',
          'xl:mb-10'
        )}
      >
        <h2
          className={clsx(
            'text-base font-semibold text-black-600',
            'xl:text-xl'
          )}
        >
          피드
        </h2>
        {isMobile && (
          <button type="button" onClick={feedTypeToggle}>
            <Image
              src={feedType === 'list' ? LIST : GRID}
              width={24}
              height={24}
              alt="필터 아이콘"
            />
          </button>
        )}
      </div>
      {isLoading ? (
        <Loading height={880} width={640} />
      ) : (
        <>
          <div
            className={clsx('mx-auto grid w-full max-w-[1200px]', feedStyle)}
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
        </>
      )}
    </div>
  );
}
