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
import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCommentDetail } from '@/lib/apis/comment';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';

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

      <div className="relative h-full bg-background py-12">
        <div
          className="absolute left-0 top-0 h-[15px] w-full bg-cover bg-center bg-repeat-x"
          style={{ backgroundImage: 'url(/images/line-top.png)' }}
        />
        <div className="mx-auto w-full max-w-[640px]">
          <h3 className="mb-6 text-xl font-semibold">댓글 ({totalCount})</h3>
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
