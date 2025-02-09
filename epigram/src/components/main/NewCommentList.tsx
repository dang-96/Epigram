import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchNewComment } from '@/lib/apis/comment';
import { CommentListType, modifyComment } from '@/lib/types/type';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Comment from '../share/Comment';
import ModalFrame from '../modal/ModalFrame';
import { useDeleteComment } from '@/lib/hooks/useDeleteComment';
import CommentModifyModal from '../modal/CommentModifyModal';
import { useModifyComment } from '@/lib/hooks/useModifyComment';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import CommentDeleteModal from '../modal/CommentDeleteModal';

export default function NewCommentList() {
  // 유저 데이터
  const { userData, userDataLoading, userDataError } = useUserInfo();

  // 댓글 데이터
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['newComment'],
    queryFn: async () => {
      const res = await fetchNewComment({ limit: 4, cursor: 0 });
      return res;
    },
  });

  // 댓글 삭제
  const { isOpen, setIsOpen, commentId, setCommentId, handleDeleteComment } =
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

  if (isLoading || userDataLoading) {
    return <div>로딩중...</div>;
  }

  if (isError || userDataError) {
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
        <h2 className="mb-10 text-2xl font-semibold text-black-600">
          최신 댓글
        </h2>
        {data?.list.length > 0 ? (
          data?.list.map((comment: CommentListType) => {
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
        {data?.list.length > 0 && (
          <div className="mt-[72px] flex justify-center">
            <Link
              href="/"
              className="flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] border-line-200 text-xl font-medium text-blue-500"
            >
              + 최신 댓글 더보기
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
