import Link from 'next/link';
import NewEpigram from './NewEpigram';
import clsx from 'clsx';

interface NewEpigramProps {
  marginBottom?: string;
}

export default function NewEpigramList({ marginBottom }: NewEpigramProps) {
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
      <NewEpigram />
      <div className="flex justify-center">
        <Link
          href="/feed"
          className="flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] border-line-200 text-xl font-medium text-blue-500"
        >
          + 에프기램 더보기
        </Link>
      </div>
    </div>
  );
}
