import Link from 'next/link';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchNewComment } from '@/lib/apis/comment';
import { CommentListType, modifyComment } from '@/lib/types/type';
import Image from 'next/image';
import Comment from '../share/Comment';
import ModalFrame from '../modal/ModalFrame';
import { useDeleteComment } from '@/lib/hooks/useDeleteComment';
import CommentModifyModal from '../modal/CommentModifyModal';
import { useModifyComment } from '@/lib/hooks/useModifyComment';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import CommentDeleteModal from '../modal/CommentDeleteModal';
import Loading from '../share/Loading';
import clsx from 'clsx';

export default function NewCommentList() {
  // 유저 데이터
  const { userData, userDataLoading, userDataError } = useUserInfo();

  // 댓글 데이터
  const { data, fetchNextPage, hasNextPage, isLoading, isError, refetch } =
    useInfiniteQuery({
      queryKey: ['newComment'],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await fetchNewComment({ limit: 3, cursor: pageParam });

        return res;
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      initialPageParam: 0,
    });
  const totalCount = data?.pages[0].totalCount;
  const currentCount =
    data?.pages?.reduce((acc, page) => acc + page?.list.length, 0) ?? 0;
  const isMoreButton = currentCount >= totalCount ? false : hasNextPage;
  const newCommentLoading = isLoading || userDataLoading;
  const newCommentError = isError || userDataError;

  // 댓글 삭제
  const { isOpen, setIsOpen, setCommentId, handleDeleteComment } =
    useDeleteComment();

  const deleteComment = () => {
    handleDeleteComment({ commentRefetch: refetch });
  };

  // 댓글 수정
  const {
    isOpen: modifyIsOpen,
    setIsOpen: modifySetIsOpen,
    setCommentId: modifySetCommentId,
    handleModifyComment,
  } = useModifyComment();

  const modifyComment = ({ isPrivate, content }: modifyComment) => {
    handleModifyComment({
      commentRefetch: refetch,
      isPrivate: isPrivate,
      content: content,
    });
  };

  if (newCommentError) {
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
      <div
        className={clsx('mx-auto mb-14 w-full max-w-[640px]', 'xl:mb-[140px]')}
      >
        <h2
          className={clsx(
            'mb-6 text-base font-semibold text-black-600',
            'xl:mb-10 xl:text-2xl'
          )}
        >
          최신 댓글
        </h2>
        {newCommentLoading ? (
          <Loading height={570} width={640} />
        ) : (
          <>
            {data?.pages?.length ? (
              data?.pages?.flatMap(({ list }) =>
                list?.map((comment: CommentListType) => {
                  return (
                    <Comment
                      key={comment.id}
                      data={comment}
                      userId={userData?.id}
                      setIsOpen={setIsOpen}
                      setCommentId={setCommentId}
                      modifySetIsOpen={modifySetIsOpen}
                      modifySetCommentId={modifySetCommentId}
                    />
                  );
                })
              )
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

            <div className={clsx('mt-10 flex justify-center', 'xl:mt-[72px]')}>
              {isMoreButton ? (
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  className={clsx(
                    'flex h-12 w-full max-w-[153px] items-center justify-center rounded-full border-[1px] border-line-200 text-sm font-medium text-blue-500',
                    'xl:h-14 xl:max-w-[238px] xl:text-xl'
                  )}
                >
                  + 최신 댓글 더보기
                </button>
              ) : (
                <Link
                  href="/feed"
                  className={clsx(
                    'flex h-[56px] w-full max-w-[173px] items-center justify-center rounded-full border-[1px] border-line-200 text-sm font-medium text-blue-500',
                    'xl:h-14 xl:max-w-[238px] xl:text-xl'
                  )}
                >
                  + 댓글 작성된 피드 보기
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
