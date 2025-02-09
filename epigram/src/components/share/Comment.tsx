import { CommentListType } from '@/lib/types/type';

interface CommentProps {
  data: CommentListType;
  userId: number | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCommentId: React.Dispatch<React.SetStateAction<string>>;
  modifySetIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modifySetCommentId: React.Dispatch<React.SetStateAction<string>>;
}

export default function Comment({
  data,
  userId,
  setIsOpen,
  setCommentId,
  modifySetIsOpen,
  modifySetCommentId,
}: CommentProps) {
  return (
    <>
      <div className="w-full max-w-[640px] border-t-[1px] border-line-200 px-6 py-[35px]">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div
              className="mr-4 h-12 w-12 rounded-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  data.writer.image || 'url(/images/profile-default.png)',
              }}
            />
            <span className="mr-2 text-base font-normal text-black-300">
              {data.writer.nickname}
            </span>
            <span className="text-base font-normal text-black-300">
              1시간 전
            </span>
          </div>

          {data.writer.id === userId && (
            <div className="flex items-start gap-4">
              <button
                type="button"
                className="border-b-[1px] border-black-600 text-base text-black-600"
                onClick={() => {
                  modifySetIsOpen(true);
                  modifySetCommentId(String(data.id));
                }}
              >
                수정
              </button>
              <button
                type="button"
                className="border-b-[1px] border-red text-base text-red"
                onClick={() => {
                  setIsOpen(true);
                  setCommentId(String(data.id));
                }}
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <p className="pl-16 text-xl font-normal">{data.content}</p>
      </div>
    </>
  );
}
