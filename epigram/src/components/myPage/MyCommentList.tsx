import { CommentListType, CommentScrollType } from '@/lib/types/type';
import Image from 'next/image';
import Comment from '../share/Comment';
import { useDeleteComment } from '@/lib/hooks/useDeleteComment';
import { useModifyComment } from '@/lib/hooks/useModifyComment';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface MyCommentList {
  commentData: CommentScrollType | undefined;
  fetchNextPage: () => any;
  hasNextPage: boolean;
}

export default function MyCommentList({
  commentData,
  hasNextPage,
  fetchNextPage,
}: MyCommentList) {
  const queryClient = useQueryClient();
  const { userData } = useUserInfo();
  const { setIsOpen, setCommentId } = useDeleteComment();

  const { setIsOpen: modifySetIsOpen, setCommentId: modifySetCommentId } =
    useModifyComment();
  const [isCollapse, setIsCollapse] = useState<boolean>(false);

  // 더보기 기능
  const moreClick = () => {
    fetchNextPage();
    setIsCollapse(true);
  };

  // 접기 기능
  const collapseClick = () => {
    queryClient.resetQueries<any>(['myComment']);
    setIsCollapse(false);
  };
  return (
    <div>
      {commentData?.pages && commentData.pages?.length > 0 ? (
        <>
          {commentData.pages?.flatMap(({ list }) =>
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
          )}
          <div className="mt-14 flex justify-center">
            {hasNextPage && (
              <button
                type="button"
                onClick={moreClick}
                className="flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] border-line-200 text-xl font-medium text-blue-500"
              >
                + 에피그램 더보기
              </button>
            )}
            {!hasNextPage && isCollapse && (
              <button
                type="button"
                onClick={collapseClick}
                className="flex h-[56px] w-full max-w-[238px] items-center justify-center rounded-full border-[1px] border-line-200 text-xl font-medium text-blue-500"
              >
                - 에피그램 접기
              </button>
            )}
          </div>
        </>
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
      {/* {commentData?.list && commentData.list.length > 0 ? (
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
      )} */}
    </div>
  );
}
