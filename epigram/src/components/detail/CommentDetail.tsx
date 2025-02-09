import { CommentListType, CommentType, modifyComment } from '@/lib/types/type';
import Comment from '../share/Comment';
import CommentWrite from './CommentWrite';
import { useState } from 'react';
import ModalFrame from '../modal/ModalFrame';
import { useDeleteComment } from '@/lib/hooks/useDeleteComment';
import CommentModifyModal from '../modal/CommentModifyModal';
import { useModifyComment } from '@/lib/hooks/useModifyComment';
import CommentDeleteModal from '../modal/CommentDeleteModal';

interface CommentDetailProps {
  data: CommentType | undefined;
  userId: number | null;
  epigramId: number;
  refetch: () => void;
}

export default function CommentDetail({
  data,
  userId,
  epigramId,
  refetch,
}: CommentDetailProps) {
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
          <h3 className="mb-6 text-xl font-semibold">
            댓글 ({data?.totalCount})
          </h3>
          {/* 댓글 작성 */}
          <CommentWrite
            epigramId={Number(epigramId)}
            commentRefetch={refetch}
          />

          {/* 댓글 리스트 */}
          {data?.list.map((comment: CommentListType) => {
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
          })}
        </div>
      </div>
    </>
  );
}
