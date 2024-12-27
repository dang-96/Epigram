import Link from 'next/link';
import Epigram from '../share/Epigram';

export default function NewEpigram() {
  return (
    <div className="mx-auto mb-[140px] w-full max-w-[640px]">
      <h2 className="mb-10 text-2xl font-semibold text-black-600">
        최신 에피그램
      </h2>
      <Epigram />
      <Epigram />
      <Epigram />
      <div className="flex justify-center">
        <Link
          href="/"
          className="border-line-200 flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] text-xl font-medium text-blue-500"
        >
          + 에프기램 더보기
        </Link>
      </div>
    </div>
  );
}
