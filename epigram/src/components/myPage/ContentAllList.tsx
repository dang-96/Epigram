import clsx from 'clsx';
import { useState } from 'react';
import { match } from 'ts-pattern';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNewEpigram } from '@/lib/apis/epigram';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import { fetchMyCommentList } from '@/lib/apis/comment';
import { modifyComment } from '@/lib/types/type';
import { useDeleteComment } from '@/lib/hooks/useDeleteComment';
import { useModifyComment } from '@/lib/hooks/useModifyComment';
import ModalFrame from '../modal/ModalFrame';
import CommentModifyModal from '../modal/CommentModifyModal';
import CommentDeleteModal from '../modal/CommentDeleteModal';
import MyEpigramList from './MyEpigramList';
import MyCommentList from './MyCommentList';
import Loading from '../share/Loading';

export default function ContentAllList() {
  const queryClient = useQueryClient();
  const EPIGRAM_LIST_LIMIT = 3;
  const COMMENT_LIST_LIMIT = 3;
  const EPIGRAM = 'epigram';
  const COMMENT = 'comment';
  const [myPageTab, setMyPageTab] = useState<string>(EPIGRAM);
  const { userData } = useUserInfo();

  const {
    isOpen: deleteIsOpen,
    setIsOpen: deleteSetIsOpen,
    handleDeleteComment,
    setCommentId: deleteSetCommentId,
  } = useDeleteComment();

  const {
    isOpen: modifyIsOpen,
    setIsOpen: modifySetIsOpen,
    handleModifyComment,
    setCommentId: modifySetCommentId,
  } = useModifyComment();

  // 마이페이지 에피그램 리스트 데이터
  const {
    data: epigramData,
    fetchNextPage: epigramFetchNextPage,
    hasNextPage: epigramHasNextPage,
    isLoading: epigramLoading,
    isError: epigramError,
    refetch: epigramRefetch,
  } = useInfiniteQuery({
    queryKey: ['myEpigram'],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchNewEpigram({
        limit: EPIGRAM_LIST_LIMIT,
        cursor: pageParam,
        writerId: userData?.id,
      });

      return res;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
  });

  // 마이페이지 댓글 리스트 데이터
  const {
    data: commentData,
    fetchNextPage: commentFetchNextPage,
    hasNextPage: commentHasNextPage,
    isLoading: commentIsLoading,
    isError: commentIsError,
    refetch: commentRefetch,
  } = useInfiniteQuery({
    queryKey: ['myComment'],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchMyCommentList({
        id: userData?.id,
        limit: COMMENT_LIST_LIMIT,
        cursor: pageParam,
      });
      return res;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
    enabled: !!userData?.id,
  });

  // 에피그램 총 갯수
  const myEpigramListTotalCount = epigramData?.pages[0].totalCount;

  // 댓글 총 갯수
  const myCommentListTotalCount = commentData?.pages[0].totalCount;

  const handleTab = (tab: string) => {
    setMyPageTab(tab);
  };

  const deleteComment = () => {
    handleDeleteComment({ commentRefetch: commentRefetch });
  };

  const modifyComment = ({ isPrivate, content }: modifyComment) => {
    handleModifyComment({
      commentRefetch: commentRefetch,
      isPrivate: isPrivate,
      content: content,
    });
  };

  const ep = () => {
    queryClient.resetQueries<any>('myComment');
    handleTab(EPIGRAM);
  };

  const co = () => {
    queryClient.resetQueries<any>('myEpigram');
    handleTab(COMMENT);
  };

  if (epigramLoading && commentIsLoading) {
    return <Loading height={620} width={640} />;
  }

  if (epigramError && commentIsError) {
    return <div>에러...</div>;
  }
  return (
    <>
      {/* 댓글 수정 모달 */}
      <ModalFrame isOpen={modifyIsOpen} setIsOpen={modifySetIsOpen}>
        <CommentModifyModal
          setIsOpen={modifySetIsOpen}
          modifyComment={modifyComment}
        />
      </ModalFrame>

      {/* 댓글 삭제 모달 */}
      <ModalFrame isOpen={deleteIsOpen} setIsOpen={deleteSetIsOpen}>
        <CommentDeleteModal
          setIsOpen={deleteSetIsOpen}
          deleteComment={deleteComment}
        />
      </ModalFrame>
      <div
        className={clsx('mx-auto w-full max-w-[640px] px-[10px]', 'xl:px-5')}
      >
        <div
          className={clsx(
            'mb-6 flex items-center gap-4',
            'sm:mb-8',
            'xl:mb-12 xl:gap-6'
          )}
        >
          <button
            type="button"
            className={clsx(
              'text-base',
              'sm:text-xl',
              'xl:text-2xl',
              myPageTab === EPIGRAM && 'font-semibold'
            )}
            onClick={ep}
          >
            내 에피그램({myEpigramListTotalCount})
          </button>
          <button
            type="button"
            className={clsx(
              'text-base',
              'sm:text-xl',
              'xl:text-2xl',
              myPageTab === COMMENT && 'font-semibold'
            )}
            onClick={co}
          >
            내 댓글({myCommentListTotalCount})
          </button>
        </div>
        {match(myPageTab)
          .with(EPIGRAM, () => (
            <MyEpigramList
              epigramData={epigramData}
              fetchNextPage={epigramFetchNextPage}
              hasNextPage={epigramHasNextPage}
            />
          ))
          .with(COMMENT, () => (
            <MyCommentList
              commentData={commentData}
              fetchNextPage={commentFetchNextPage}
              hasNextPage={commentHasNextPage}
              deleteSetIsOpen={deleteSetIsOpen}
              deleteSetCommentId={deleteSetCommentId}
              modifySetIsOpen={modifySetIsOpen}
              modifySetCommentId={modifySetCommentId}
            />
          ))
          .otherwise(() => '')}
      </div>
    </>
  );
}
