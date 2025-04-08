import CommentDetail from '@/components/detail/CommentDetail';
import EpigramDetail from '@/components/detail/EpigramDetail';
import Loading from '@/components/share/Loading';
import LoginMessage from '@/components/share/LoginMessage';
import { fetchCommentDetail } from '@/lib/apis/comment';
import { fetchEpigramDetail } from '@/lib/apis/epigram';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import { EpigramDetailType } from '@/lib/types/type';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import clsx from 'clsx';
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
    queryClient.resetQueries<any>({ queryKey: ['commentDetail'] });
  }, []);

  if (!loginState) {
    return <LoginMessage />;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <div className="w-full bg-background">
      {isLoading ? (
        <Loading width={'100%'} height={'100vh'} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
