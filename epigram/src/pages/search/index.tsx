import { fetchNewEpigram } from '@/lib/apis/epigram';
import { EpigramType } from '@/lib/types/type';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const [keyword, setKeyword] = useState<string>(''); // 최종 검색어
  const [inputValue, setInputValue] = useState<string>(''); // input 검색어
  const [recentKeywordList, setRecentKeywordList] = useState<string[]>([]); // 최근 검색어 리스트
  const [isSearch, setIsSearch] = useState<boolean>(); // 검색 여부
  const { data, isLoading, isError } = useQuery({
    queryKey: ['searchEpigram', keyword],
    queryFn: async () => {
      const res = await fetchNewEpigram({
        limit: 4,
        cursor: 0,
        keyword: keyword,
      });

      if (res.list.length > 0) {
        return res;
      } else {
        setIsSearch(true);
        return res;
      }
    },
    enabled: !!keyword,
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

  useEffect(() => {
    const savedKeywordList = JSON.parse(
      localStorage.getItem('recentKeyWordList') || '[]'
    );
    setIsSearch(false);
    setRecentKeywordList(savedKeywordList);
  }, []);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }
  return (
    <div className="mx-auto my-[46px] w-full max-w-[640px]">
      <form onSubmit={handleSubmit}>
        <div className="mb-10 flex items-center justify-between border-b-4 border-b-black-800 pb-[22px]">
          <input
            type="text"
            className="h-8 w-full text-2xl font-normal focus-visible:outline-none"
            placeholder="검색어를 입력해주세요."
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
          <button type="submit">
            <Image
              src="/icons/search-icon.svg"
              width={36}
              height={36}
              alt="검색 아이콘"
            />
          </button>
        </div>
      </form>

      {recentKeywordList.length > 0 && (
        <>
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-medium">최근 검색어</h2>
            <button
              type="button"
              className="text-base font-semibold text-red"
              onClick={handleRemoveSavedKeyword}
            >
              모두 지우기
            </button>
          </div>

          <ul className="mb-10 flex flex-wrap items-center gap-4">
            {recentKeywordList.map((recentKeyWord, index) => {
              return (
                <li
                  key={index}
                  className="rounded-[22px] bg-background px-[14px] py-3 text-2xl font-normal text-black-300"
                >
                  <button type="button">#{recentKeyWord}</button>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {data?.list.length > 0
        ? data.list.map((epigram: EpigramType) => {
            return (
              <div
                key={epigram.id}
                className="border-b-[1px] border-b-gray-100 p-6"
              >
                <Link
                  href={`/feed/${epigram.id}`}
                  className="font-point text-xl font-medium text-black-600 hover:font-semibold"
                >
                  {epigram.content}
                </Link>
                <span className="mt-6 block text-xl font-medium text-blue-400">
                  - {epigram.author} -
                </span>
                <ul className="flex flex-wrap items-center justify-end gap-3">
                  {epigram.tags?.map((tag) => {
                    return (
                      <li
                        key={tag.id}
                        className="text-xl font-normal text-blue-400"
                      >
                        #{tag.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })
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
    </div>
  );
}
