import CommentDetail from '@/components/detail/CommentDetail';
import EpigramDetail from '@/components/detail/EpigramDetail';
import { fetchCommentDetail } from '@/lib/apis/comment';
import { fetchEpigramDetail } from '@/lib/apis/epigram';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import { CommentType, EpigramDetailType } from '@/lib/types/type';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DetailPage() {
  const { userData } = useUserInfo(); // 유저 정보
  const [isMore, setIsMore] = useState<boolean>(false); // 에피그램 드롭다운 버튼 display 상태

  const router = useRouter();
  const { id } = router.query; // url의 에피그램 id 쿼리값 가져오기
  const commentId: string | undefined = Array.isArray(id) ? id[0] : id;

  // 에피그램 상세 데이터
  const {
    data: epigramDetailData,
    isLoading: epigramDetailLoading,
    isError: epigramDetailError,
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
    isLoading: commentDetailLoading,
    isError: commentDetailError,
    refetch,
  } = useQuery<CommentType>({
    queryKey: ['commentDetail', Number(commentId)],
    queryFn: async () => {
      if (typeof id === 'string') {
        const res = await fetchCommentDetail({
          id: Number(id),
          limit: 4,
          cursor: 0,
        });
        return res;
      }
    },
    enabled: typeof id === 'string',
  });

  const isLoading = epigramDetailLoading || commentDetailLoading;
  const isError = epigramDetailError || commentDetailError;

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <div>
      <EpigramDetail data={epigramDetailData} isMore={isMore} />
      <CommentDetail
        data={commentDetailData}
        userId={userData?.id}
        epigramId={Number(commentId)}
        refetch={refetch}
      />
    </div>
  );
}
