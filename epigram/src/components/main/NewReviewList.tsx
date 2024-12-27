import Link from 'next/link';
import Review from '../share/Review';

export default function NewReviewList() {
  return (
    <div className="mx-auto w-full max-w-[640px]">
      <h2 className="mb-10 text-2xl font-semibold text-black-600">최신 댓글</h2>
      <Review />
      <Review />
      <Review />
      <Review />
      <div className="mt-[72px] flex justify-center">
        <Link
          href="/"
          className="border-line-200 flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] text-xl font-medium text-blue-500"
        >
          + 최신 댓글 더보기
        </Link>
      </div>
    </div>
  );
}
