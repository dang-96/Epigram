import CommentDetail from '@/components/detail/CommentDetail';
import EpigramDetail from '@/components/detail/EpigramDetail';
import { fetchCommentDetail } from '@/lib/apis/comment';
import { fetchEpigramDetail } from '@/lib/apis/epigram';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import { EpigramDetailType } from '@/lib/types/type';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DetailPage() {
  const queryClient = useQueryClient();
  const { userData, loginState } = useUserInfo(); // 유저 정보
  const [isMore, setIsMore] = useState<boolean>(false); // 에피그램 드롭다운 버튼 display 상태

  const router = useRouter();
  const { id } = router.query; // url의 에피그램 id 쿼리값 가져오기
  const commentId: string | undefined = Array.isArray(id) ? id[0] : id;

  // 에피그램 상세 데이터
  const {
    data: epigramDetailData,
    isLoading: epigramDetailLoading,
    isError: epigramDetailError,
    refetch: epigramDetailRefetch,
  } = useQuery<EpigramDetailType>({
    queryKey: ['epigramDetail', commentId, userData?.id],
    queryFn: async () => {
      if (typeof id === 'string') {
        const res = await fetchEpigramDetail(Number(id));
        if (userData?.id === res.writerId) {
          setIsMore(true);
        } else {
          setIsMore(false);
        }
        return res;
      }
    },
    enabled: typeof id === 'string' && userData?.id !== null,
  });

  // 에피그램 상세 댓글 데이터
  const {
    data: commentDetailData,
    fetchNextPage,
    hasNextPage,
    isLoading: commentDetailLoading,
    isError: commentDetailError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['commentDetail', Number(commentId)],
    queryFn: async ({ pageParam = 0 }) => {
      if (typeof id === 'string') {
        const res = await fetchCommentDetail({
          id: Number(id),
          limit: 4,
          cursor: pageParam,
        });

        return res;
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
    enabled: typeof id === 'string',
  });

  const isLoading = epigramDetailLoading || commentDetailLoading;
  const isError = epigramDetailError || commentDetailError;

  // 페이지 이동후 다시 들어왔을때 더보기로 보여진 댓글 컨텐츠 초기화
  useEffect(() => {
    queryClient.resetQueries<any>(['commentDetail']);
  }, []);

  if (!loginState) {
    return (
      <div
        className="flex w-full flex-col items-center justify-center gap-10 px-5"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        <h2 className="text-3xl">로그인 후 이용해 주세요!</h2>
        <Link
          href="/login"
          className="flex h-16 w-72 items-center justify-center rounded-xl bg-black-500 text-xl font-semibold text-white"
        >
          로그인 하러 가기
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <div>
      <EpigramDetail
        data={epigramDetailData}
        isMore={isMore}
        refetch={epigramDetailRefetch}
      />
      <CommentDetail
        data={commentDetailData}
        userId={userData?.id}
        epigramId={Number(commentId)}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        refetch={refetch}
      />
    </div>
  );
}
