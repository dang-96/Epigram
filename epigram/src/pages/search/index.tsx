import Loading from '@/components/share/Loading';
import { fetchNewEpigram } from '@/lib/apis/epigram';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import { EpigramType } from '@/lib/types/type';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useState<string>(''); // 최종 검색어
  const [inputValue, setInputValue] = useState<string>(''); // input 검색어
  const [recentKeywordList, setRecentKeywordList] = useState<string[]>([]); // 최근 검색어 리스트
  const [isSearch, setIsSearch] = useState<boolean>(); // 검색 여부
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['searchEpigram', keyword],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await fetchNewEpigram({
          limit: 4,
          cursor: pageParam,
          keyword: keyword,
        });

        if (res.list.length > 0) {
          return res;
        } else {
          setIsSearch(true);
          return res;
        }
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      initialPageParam: 0,
      enabled: !!keyword,
    });

  // 무함 스크롤
  const { totalCount, isMoreButton, scrollLoading } = useInfiniteScroll({
    data,
    fetchNextPage,
    hasNextPage,
  });

  // 최근 검색어 추가
  const handleSaveKeyword = (newKeyword: string) => {
    const savedKeywordList = JSON.parse(
      localStorage.getItem('recentKeyWordList') || '[]'
    );

    const updateRecentKeyword = [
      newKeyword,
      ...savedKeywordList.filter((kw: string) => kw !== newKeyword),
    ];

    localStorage.setItem(
      'recentKeyWordList',
      JSON.stringify(updateRecentKeyword)
    );
    setRecentKeywordList(updateRecentKeyword);
  };

  // 최근 검색어 삭제
  const handleRemoveSavedKeyword = () => {
    setRecentKeywordList([]);
    localStorage.removeItem('recentKeyWordList');
  };

  // 검색 기능
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(inputValue.trim());
    if (inputValue !== '') {
      handleSaveKeyword(inputValue.trim());
    }
  };

  const handleRecentKeywordClick = (kw: string) => {
    setInputValue(kw);
    setKeyword(kw);
  };

  useEffect(() => {
    const savedKeywordList = JSON.parse(
      localStorage.getItem('recentKeyWordList') || '[]'
    );
    setIsSearch(false);
    setRecentKeywordList(savedKeywordList);
  }, []);

  // 이미 검색한 내용 다시 검색했을때 초기화
  useEffect(() => {
    queryClient.resetQueries<any>(['searchEpigram']);
  }, [keyword]);

  if (isError) {
    return <div>에러</div>;
  }
  return (
    <div
      className={clsx(
        'relative mx-auto my-[46px] h-[calc(100vh-52px)] w-full max-w-[640px] px-[10px]',
        'sm:h-[calc(100vh-60px)]',
        'xl:h-[calc(100vh-80px)] xl:px-5'
      )}
    >
      <form onSubmit={handleSubmit}>
        <div
          className={clsx(
            'mb-6 flex items-center justify-between border-b-4 border-b-black-800 pb-[14px]',
            'sm:mb-8',
            'xl:mb-10 xl:pb-[22px]'
          )}
        >
          <input
            type="text"
            className={clsx(
              'h-8 w-full text-base font-normal focus-visible:outline-none',
              'sm:text-xl',
              'xl:text-2xl'
            )}
            placeholder="검색어를 입력해주세요."
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
          <button type="submit">
            <Image
              src="/icons/search-icon.svg"
              className={clsx('h-6 w-6', 'sm:h-9 sm:w-9')}
              width={36}
              height={36}
              alt="검색 아이콘"
            />
          </button>
        </div>
      </form>

      {recentKeywordList.length > 0 && (
        <>
          <div
            className={clsx(
              'mb-4 flex items-center justify-between',
              'sm:mb-6',
              'xl:mb-9'
            )}
          >
            <h2
              className={clsx(
                'text-base font-medium',
                'sm:text-xl',
                'xl:text-2xl'
              )}
            >
              최근 검색어
            </h2>
            <button
              type="button"
              className={clsx('text-sm font-semibold text-red', 'xl:text-base')}
              onClick={handleRemoveSavedKeyword}
            >
              모두 지우기
            </button>
          </div>

          <ul
            className={clsx(
              'mb-6 flex flex-wrap items-center gap-2',
              'sm:mb-8 sm:gap-4',
              'xl:mb-10'
            )}
          >
            {recentKeywordList.map((recentKeyWord, index) => {
              return (
                <li
                  key={index}
                  className={clsx(
                    'h-[42px] rounded-[18px] bg-background px-[14px] text-base font-normal text-black-300',
                    'sm:h-12 sm:rounded-[20px] sm:text-xl',
                    'xl:h-14 xl:rounded-[22px] xl:text-2xl'
                  )}
                >
                  <button
                    type="button"
                    className="h-full"
                    onClick={() => {
                      handleRecentKeywordClick(recentKeyWord);
                    }}
                  >
                    #{recentKeyWord}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {isLoading ? (
        <Loading height={390} width={640} />
      ) : (
        <div className="h-full">
          {totalCount > 0
            ? data?.pages?.flatMap(({ list }) =>
                list?.map((epigram: EpigramType) => {
                  return (
                    <div
                      key={epigram.id}
                      className={clsx(
                        'border-b-[1px] border-b-gray-100 px-6 py-4',
                        'xl:py-6'
                      )}
                    >
                      <Link
                        href={`/feed/${epigram.id}`}
                        className={clsx(
                          'font-point text-base font-medium text-black-600 hover:font-semibold',
                          'xl:text-xl'
                        )}
                      >
                        {epigram.content}
                      </Link>
                      <span
                        className={clsx(
                          'mt-1 block text-base font-medium text-blue-400',
                          'sm:mt-2',
                          'xl:mt-6 xl:text-xl'
                        )}
                      >
                        - {epigram.author} -
                      </span>
                      <ul
                        className={clsx(
                          'mt-1 flex flex-wrap items-center justify-end gap-3',
                          'sm:mt-2`',
                          'xl:mt-4'
                        )}
                      >
                        {epigram.tags?.map((tag) => {
                          return (
                            <li
                              key={tag.id}
                              className={clsx(
                                'text-base font-normal text-blue-400',
                                'xl:text-xl'
                              )}
                            >
                              #{tag.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })
              )
            : isSearch && (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Image
                    src="/images/not-content.png"
                    width={144}
                    height={144}
                    alt="검색어 없는경우 아이콘"
                  />
                  <h3 className="text-xl font-normal">
                    검색된 에피그램이 없습니다.
                  </h3>
                </div>
              )}

          {isMoreButton && (
            <div className="absolute bottom-12 left-[50%] flex translate-x-[-50%] flex-col items-center justify-center gap-1 text-base font-semibold">
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
        </div>
      )}
    </div>
  );
}
