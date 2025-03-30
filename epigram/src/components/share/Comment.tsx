import { CommentListType } from '@/lib/types/type';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface CommentProps {
  data: CommentListType;
  userId: number | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCommentId: React.Dispatch<React.SetStateAction<number>>;
  modifySetIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modifySetCommentId: React.Dispatch<React.SetStateAction<number>>;
}

export default function Comment({
  data,
  userId,
  setIsOpen,
  setCommentId,
  modifySetIsOpen,
  modifySetCommentId,
}: CommentProps) {
  const [day, setDay] = useState<string>('');

  useEffect(() => {
    const todayDate = new Date();
    const commentDate = new Date(data.createdAt);

    const millisecondDifference = todayDate.getTime() - commentDate.getTime();
    const secondDifference = Math.floor(millisecondDifference / 1000);

    const years = Math.floor(secondDifference / (60 * 60 * 24 * 365));
    const months = Math.floor(secondDifference / (60 * 60 * 24 * 30));
    const days = Math.floor(secondDifference / (60 * 60 * 24));
    const hours = Math.floor(secondDifference / (60 * 60));
    const minutes = Math.floor(secondDifference / 60);

    if (years > 0) {
      setDay(years + '년 전');
    } else if (months > 0) {
      setDay(months + '개월 전');
    } else if (days > 0) {
      setDay(days + '일 전');
    } else if (hours > 0) {
      setDay(hours + '시간 전');
    } else if (minutes > 0) {
      setDay(minutes + '분 전');
    }
  }, []);

  return (
    <>
      <div
        className={clsx(
          'w-full max-w-[640px] border-t-[1px] border-line-200 px-6 py-[16px]',
          'sm:py-6',
          'xl:py-[35px]'
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div
              className="mr-4 h-12 w-12 rounded-full bg-white bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${data.writer?.image || '/images/profile-default.png'})`,
              }}
            />
            <span
              className={clsx(
                'mr-2 text-xs font-normal text-black-300',
                'sm:text-sm',
                'xl:text-base'
              )}
            >
              {data.writer?.nickname}
            </span>
            <span
              className={clsx(
                'text-xs font-normal text-black-300',
                'sm:text-sm',
                'xl:text-base'
              )}
            >
              {day}
            </span>
          </div>

          {data.writer?.id === userId && (
            <div className="flex items-start gap-4">
              <button
                type="button"
                className={clsx(
                  'border-b-[1px] border-black-600 text-xs text-black-600',
                  'sm:text-sm',
                  'xl:text-base'
                )}
                onClick={() => {
                  modifySetIsOpen(true);
                  modifySetCommentId(data.id);
                }}
              >
                수정
              </button>
              <button
                type="button"
                className={clsx(
                  'border-b-[1px] border-red text-xs text-red',
                  'sm:text-sm',
                  'xl:text-base'
                )}
                onClick={() => {
                  setIsOpen(true);
                  setCommentId(data.id);
                }}
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <p
          className={clsx(
            'mt-[-15px] pl-16 text-sm font-normal',
            'sm:mt-[-10px] sm:text-base',
            'xl:mt-[-5px] xl:text-xl'
          )}
        >
          {data.content}
        </p>
      </div>
    </>
  );
}
