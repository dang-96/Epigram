import { useState } from 'react';
import { deleteComment } from '../apis/comment';

interface handleDeleteCommentProps {
  commentRefetch: () => void;
}

export const useDeleteComment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number>(0);

  const handleDeleteComment = async ({
    commentRefetch,
  }: handleDeleteCommentProps) => {
    setIsLoading(true);

    try {
      const res = await deleteComment(commentId);

      setIsLoading(false);
      setIsError(false);
      commentRefetch();
      setIsOpen(false);
      return res;
    } catch (error) {
      setIsError(true);
      console.log('댓글 삭제 api 호출 실패', error);
      throw new Error('댓글을 삭제 api 호출에 실패했습니다.');
    }
  };

  return {
    isLoading,
    isError,
    isOpen,
    commentId,
    setCommentId,
    setIsOpen,
    handleDeleteComment,
  };
};
