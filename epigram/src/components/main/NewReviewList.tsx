import Link from 'next/link';
import Review from '../share/Review';
import { useQuery } from '@tanstack/react-query';
import { fetchNewComment } from '@/lib/apis/comment';
import { CommentType } from '@/lib/types/type';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function NewReviewList() {
  const [userId, setUserId] = useState<number>(0);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['newComment'],
    queryFn: async () => {
      const res = await fetchNewComment({ limit: 4, cursor: 0 });
      console.log(res);
      return res;
    },
  });

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    const userInfoParse = userInfo && JSON.parse(userInfo);
    setUserId(userInfoParse?.id);
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-[640px]">
      <h2 className="mb-10 text-2xl font-semibold text-black-600">최신 댓글</h2>
      {data.list.length > 0 ? (
        data.list.map((comment: CommentType) => {
          return <Review key={comment.id} data={comment} userId={userId} />;
        })
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/images/not-content.png"
            width={144}
            height={144}
            alt="컨텐츠 없는 경우 아이콘"
          />
          <p className="text-center text-xl">최신 댓글이 없습니다.</p>
        </div>
      )}
      {data.list.length > 0 && (
        <div className="mt-[72px] flex justify-center">
          <Link
            href="/"
            className="flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] border-line-200 text-xl font-medium text-blue-500"
          >
            + 최신 댓글 더보기
          </Link>
        </div>
      )}
    </div>
  );
}
