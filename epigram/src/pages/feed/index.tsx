import Epigram from '@/components/share/Epigram';
import FixedMenu from '@/components/share/FixedMenu';
import { fetchNewEpigram } from '@/lib/apis/epigram';
import { EpigramType } from '@/lib/types/type';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export default function FeedPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['newEpigram'],
    queryFn: async () => {
      const res = await fetchNewEpigram({ limit: 6, cursor: 0 });
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
    <div className="h-full min-h-screen bg-background py-[120px]">
      <h2 className="mx-auto mb-10 w-full max-w-[1200px] text-2xl font-semibold text-black-600">
        피드
      </h2>
      <div
        className={clsx(
          'mx-auto grid w-full max-w-[1200px] gap-x-[30px] gap-y-[40px]',
          data?.list && data.list.length > 0 && 'grid-cols-2'
        )}
      >
        {data?.list && data.list.length > 0 ? (
          data.list.map((epigram: EpigramType) => {
            return (
              <Link href={`/feed/${epigram.id}`} key={epigram.id}>
                <Epigram data={epigram} height={260} />
              </Link>
            );
          })
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
      {data.list.length > 6 && (
        <div className="mt-[72px] flex justify-center">
          <Link
            href="/"
            className="flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] border-line-200 text-xl font-medium text-blue-500"
          >
            + 에피그램 더보기
          </Link>
        </div>
      )}
      <FixedMenu />
    </div>
  );
}
