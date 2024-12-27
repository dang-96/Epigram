import Epigram from '@/components/share/Epigram';
import FixedMenu from '@/components/share/FixedMenu';
import Link from 'next/link';

export default function FeedPage() {
  return (
    <div className="h-full min-h-screen bg-background py-[120px]">
      <h2 className="mx-auto mb-10 w-full max-w-[1200px] text-2xl font-semibold text-black-600">
        피드
      </h2>
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-x-[30px] gap-y-[40px]">
        <Epigram height={260} />
        <Epigram height={260} />
        <Epigram height={260} />
        <Epigram height={260} />
        <Epigram height={260} />
        <Epigram height={260} />
      </div>
      <div className="mt-[72px] flex justify-center">
        <Link
          href="/"
          className="flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] border-line-200 text-xl font-medium text-blue-500"
        >
          + 에피그램 더보기
        </Link>
      </div>
      <FixedMenu />
    </div>
  );
}
