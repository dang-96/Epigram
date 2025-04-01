import { CommentListType, CommentScrollType } from '@/lib/types/type';
import Image from 'next/image';
import Comment from '../share/Comment';
import { useDeleteComment } from '@/lib/hooks/useDeleteComment';
import { useModifyComment } from '@/lib/hooks/useModifyComment';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

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
  const [isCollapse, setIsCollapse] = useState<boolean>(false); // 더보기 버튼이 클릭이 되어야지만 그 후에 접기 버튼이 보이도록 상태 설정
  const [maxCount, setMaxCount] = useState<boolean>(false);

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

  // 토달 개수랑 내용이 같거나 많아지면 접기 버튼 노출
  useEffect(() => {
    if (commentData) {
      if (commentData?.pages.length * 3 >= commentData?.pages[0].totalCount) {
        setMaxCount(true);
      }
    }
  }, [commentData]);
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
            {hasNextPage && !maxCount && (
              <button
                type="button"
                onClick={moreClick}
                className={clsx(
                  'flex h-12 w-full max-w-[153px] items-center justify-center rounded-full border-[1px] border-line-200 text-sm font-medium text-blue-500',
                  'xl:h-14 xl:max-w-[238px] xl:text-xl'
                )}
              >
                + 댓글 더보기
              </button>
            )}
            {maxCount && isCollapse && (
              <button
                type="button"
                onClick={collapseClick}
                className={clsx(
                  'flex h-12 w-full max-w-[153px] items-center justify-center rounded-full border-[1px] border-line-200 text-sm font-medium text-blue-500',
                  'xl:h-14 xl:max-w-[238px] xl:text-xl'
                )}
              >
                - 댓글 접기
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
    </div>
  );
}
