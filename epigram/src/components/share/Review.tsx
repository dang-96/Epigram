import { CommentListType } from '@/lib/types/type';

interface ReviewProps {
  data: CommentListType;
  userId: number;
}

export default function Review({ data, userId }: ReviewProps) {
  return (
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
          <span className="text-base font-normal text-black-300">1시간 전</span>
        </div>

        {data.writer.id === userId && (
          <div className="flex items-start gap-4">
            <button
              type="button"
              className="border-b-[1px] border-black-600 text-base text-black-600"
            >
              수정
            </button>
            <button
              type="button"
              className="border-b-[1px] border-red text-base text-red"
            >
              삭제
            </button>
          </div>
        )}
      </div>
      <p className="pl-16 text-xl font-normal">{data.content}</p>
    </div>
  );
}
