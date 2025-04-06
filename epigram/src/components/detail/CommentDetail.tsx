import {
  CommentListType,
  CommentScrollType,
  modifyComment,
} from '@/lib/types/type';
import Comment from '../share/Comment';
import CommentWrite from './CommentWrite';
import ModalFrame from '../modal/ModalFrame';
import { useDeleteComment } from '@/lib/hooks/useDeleteComment';
import CommentModifyModal from '../modal/CommentModifyModal';
import { useModifyComment } from '@/lib/hooks/useModifyComment';
import CommentDeleteModal from '../modal/CommentDeleteModal';
import Image from 'next/image';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import clsx from 'clsx';

interface CommentDetailProps {
  data: CommentScrollType | undefined;
  userId: number | null;
  epigramId: number;
  fetchNextPage: () => any;
  hasNextPage: boolean;
  refetch: () => void;
}

export default function CommentDetail({
  data,
  userId,
  epigramId,
  fetchNextPage,
  hasNextPage,
  refetch,
}: CommentDetailProps) {
  const { totalCount, isMoreButton, scrollLoading } = useInfiniteScroll({
    data,
    hasNextPage,
    fetchNextPage,
  });
  const { isOpen, setIsOpen, setCommentId, handleDeleteComment } =
    useDeleteComment();

  const {
    isOpen: modifyIsOpen,
    setIsOpen: modifySetIsOpen,
    setCommentId: modifySetCommentId,
    handleModifyComment,
  } = useModifyComment();

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

      <div className={clsx('relative px-[10px] py-10', 'xl:px-5 xl:py-12')}>
        <div
          className="absolute left-0 top-0 h-[15px] w-full bg-center"
          style={{ backgroundImage: 'url(/images/line-top.png)' }}
        />
        <div className="mx-auto w-full max-w-[640px]">
          <h3
            className={clsx(
              'mb-4 text-base font-semibold',
              'sm:mb-6',
              'xl:text-xl'
            )}
          >
            댓글 ({totalCount})
          </h3>
          {/* 댓글 작성 */}
          <CommentWrite
            epigramId={Number(epigramId)}
            commentRefetch={refetch}
          />

          {/* 댓글 리스트 */}
          {data?.pages && Number(totalCount) > 0 ? (
            data.pages?.flatMap(({ list }) =>
              list?.map((comment: CommentListType) => {
                return (
                  <Comment
                    key={comment.id}
                    data={comment}
                    userId={userId}
                    setIsOpen={setIsOpen}
                    setCommentId={setCommentId}
                    modifySetIsOpen={modifySetIsOpen}
                    modifySetCommentId={modifySetCommentId}
                  />
                );
              })
            )
          ) : (
            <div
              className={clsx(
                'my-10 flex flex-col items-center justify-center gap-2',
                'sm:my-20 sm:gap-4',
                'xl:my-40 xl:gap-6'
              )}
            >
              <Image
                src="/images/not-content.png"
                className={clsx('h-28 w-28', 'xl:h-36 xl:w-36')}
                width={144}
                height={144}
                alt="댓글이 없는경우 아이콘"
              />
              <p
                className={clsx(
                  'text-center text-sm font-normal leading-[1.5] text-black-600',
                  'sm:text-base',
                  'xl:text-xl'
                )}
              >
                아직 댓글이 없어요!
                <br />
                댓글을 달고 다른 사람들과 교류해보세요.
              </p>
            </div>
          )}
        </div>
        {isMoreButton && (
          <div className="absolute bottom-10 left-[50%] flex translate-x-[-50%] flex-col items-center justify-center gap-1 text-base font-semibold">
            {/* <span className="text-blue-400">피드 더보기</span> */}
            {scrollLoading ? (
              <span className="text-xl text-blue-400">. . .</span>
            ) : (
              <Image
                src="/icons/scroll-icon.svg"
                width={34}
                height={34}
                alt="스크롤 아이콘"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
