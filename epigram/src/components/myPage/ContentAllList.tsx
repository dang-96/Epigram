import clsx from 'clsx';
import { useState } from 'react';
import { match } from 'ts-pattern';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchNewEpigram } from '@/lib/apis/epigram';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import { fetchMyCommentList } from '@/lib/apis/comment';
import Image from 'next/image';
import Comment from '../share/Comment';
import { CommentListType, EpigramType, modifyComment } from '@/lib/types/type';
import { useDeleteComment } from '@/lib/hooks/useDeleteComment';
import { useModifyComment } from '@/lib/hooks/useModifyComment';
import ModalFrame from '../modal/ModalFrame';
import CommentModifyModal from '../modal/CommentModifyModal';
import CommentDeleteModal from '../modal/CommentDeleteModal';
import MyEpigramList from './MyEpigramList';

export default function ContentAllList() {
  const EPIGRAM_LIST_LIMIT = 3;
  const COMMENT_LIST_LIMIT = 3;
  const EPIGRAM = 'epigram';
  const COMMENT = 'comment';
  const [myPageTab, setMyPageTab] = useState<string>(EPIGRAM);
  const { userData } = useUserInfo();

  const { isOpen, setIsOpen, setCommentId, handleDeleteComment } =
    useDeleteComment();

  const {
    isOpen: modifyIsOpen,
    setIsOpen: modifySetIsOpen,
    setCommentId: modifySetCommentId,
    handleModifyComment,
  } = useModifyComment();

  // 마이페이지 에피그램 리스트 데이터
  const {
    data: epigramData,
    fetchNextPage,
    hasNextPage,
    isLoading: epigramLoading,
    isError: epigramError,
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
  // 에피그램 총 갯수
  const myEpigramListTotalCount = epigramData?.pages[0].totalCount;

  // 마이페이지 댓글 리스트 데이터
  const {
    data: commentData,
    isLoading: commentIsLoading,
    isError: commentIsError,
    refetch,
  } = useQuery({
    queryKey: ['myComment'],
    queryFn: async () => {
      const res = await fetchMyCommentList({
        id: userData.id,
        limit: COMMENT_LIST_LIMIT,
        cursor: 0,
      });
      return res;
    },
  });

  const handleTab = (tab: string) => {
    setMyPageTab(tab);
  };

  const deleteComment = () => {
    handleDeleteComment({ commentRefetch: refetch });
  };

  const modifyComment = ({ isPrivate, content }: modifyComment) => {
    handleModifyComment({
      commentRefetch: refetch,
      isPrivate: isPrivate,
      content: content,
    });
  };

  if (epigramLoading && commentIsLoading) {
    return <div>로딩중...</div>;
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
      <ModalFrame isOpen={isOpen} setIsOpen={setIsOpen}>
        <CommentDeleteModal
          setIsOpen={setIsOpen}
          deleteComment={deleteComment}
        />
      </ModalFrame>
      <div className="mx-auto w-full max-w-[640px]">
        <div className="mb-12 flex items-center gap-6">
          <button
            type="button"
            className={clsx(
              'text-2xl',
              myPageTab === EPIGRAM && 'font-semibold'
            )}
            onClick={() => handleTab(EPIGRAM)}
          >
            내 에피그램({myEpigramListTotalCount})
          </button>
          <button
            type="button"
            className={clsx(
              'text-2xl',
              myPageTab === COMMENT && 'font-semibold'
            )}
            onClick={() => handleTab(COMMENT)}
          >
            내 댓글({commentData?.totalCount})
          </button>
        </div>
        {match(myPageTab)
          .with(EPIGRAM, () => (
            <MyEpigramList
              epigramData={epigramData}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          ))
          .with(COMMENT, () => (
            <div>
              {commentData?.list && commentData.list.length > 0 ? (
                commentData.list.map((comment: CommentListType) => {
                  return (
                    <Comment
                      key={comment.id}
                      data={comment}
                      userId={userData.id}
                      setIsOpen={setIsOpen}
                      setCommentId={setCommentId}
                      modifySetIsOpen={modifySetIsOpen}
                      modifySetCommentId={modifySetCommentId}
                    />
                  );
                })
              ) : (
                <div className="my-40 flex flex-col items-center justify-center gap-6">
                  <Image
                    src="/images/not-content.png"
                    width={144}
                    height={144}
                    alt="댓글이 없는경우 아이콘"
                  />
                  <p className="text-center text-xl font-normal leading-[1.5] text-black-600">
                    아직 댓글이 없어요!
                    <br />
                    댓글을 달고 다른 사람들과 교류해보세요.
                  </p>
                </div>
              )}
            </div>
          ))
          .otherwise(() => '')}
      </div>
    </>
  );
}
