import { EpigramScrollType, EpigramType } from '@/lib/types/type';
import Image from 'next/image';
import Epigram from '../share/Epigram';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface MyEpigramListProps {
  epigramData: EpigramScrollType | undefined;
  fetchNextPage: () => any;
  hasNextPage: boolean;
}

export default function MyEpigramList({
  epigramData,
  hasNextPage,
  fetchNextPage,
}: MyEpigramListProps) {
  const queryClient = useQueryClient();
  const [isCollapse, setIsCollapse] = useState<boolean>(false); // 더보기 버튼이 클릭이 되어야지만 그 후에 접기 버튼이 보이도록 상태 설정
  const [maxCount, setMaxCount] = useState<boolean>(false);

  // 더보기 기능
  const moreClick = () => {
    fetchNextPage();
    setIsCollapse(true);
  };

  // 접기 기능
  const collapseClick = () => {
    queryClient.resetQueries<any>(['myEpigram']);
    setIsCollapse(false);
  };

  // 토달 개수랑 내용이 같거나 많아지면 접기 버튼 노출
  useEffect(() => {
    if (epigramData) {
      if (epigramData?.pages.length * 3 >= epigramData?.pages[0].totalCount) {
        setMaxCount(true);
      }
    }
  }, [epigramData]);
  return (
    <div>
      {epigramData?.pages && epigramData.pages.length > 0 ? (
        <>
          {epigramData.pages?.flatMap(({ list }) =>
            list?.map((epigram: EpigramType) => {
              return <Epigram key={epigram.id} data={epigram} />;
            })
          )}
          <div className="flex justify-center">
            {hasNextPage && !maxCount && (
              <button
                type="button"
                onClick={moreClick}
                className="flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] border-line-200 text-xl font-medium text-blue-500"
              >
                + 에피그램 더보기
              </button>
            )}
            {maxCount && isCollapse && (
              <button
                type="button"
                onClick={collapseClick}
                className="flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] border-line-200 text-xl font-medium text-blue-500"
              >
                - 에피그램 접기
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="my-40 flex flex-col items-center justify-center gap-6">
          <Image
            src="/images/not-content.png"
            width={144}
            height={144}
            alt="피드가 없는 경우 아이콘"
          />
          <p className="text-center text-xl font-normal leading-[1.5] text-black-600">
            아직 에피그램이 없어요!
            <br />
            에피그램을 작성하고 다른 사람들과 교류해보세요.
          </p>
        </div>
      )}
    </div>
  );
}
