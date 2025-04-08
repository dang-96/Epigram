import { useState } from 'react';
import { patchComment } from '../apis/comment';

interface handleModifyCommentProps {
  commentRefetch: () => void;
  isPrivate: boolean;
  content: string;
}

export const useModifyComment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number>(0);

  const handleModifyComment = async ({
    commentRefetch,
    isPrivate,
    content,
  }: handleModifyCommentProps) => {
    setIsLoading(true);

    try {
      const res = await patchComment({ commentId, isPrivate, content });

      setIsLoading(false);
      setIsError(false);
      commentRefetch();
      setIsOpen(false);
      return res;
    } catch (error) {
      setIsError(true);
      console.log('댓글 수정 api 호출 실패', error);
      throw new Error('댓글을 수정 api 호출에 실패했습니다.');
    }
  };

  return {
    isLoading,
    isError,
    isOpen,
    commentId,
    setCommentId,
    setIsOpen,
    handleModifyComment,
  };
};
