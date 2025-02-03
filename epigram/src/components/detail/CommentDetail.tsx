import { CommentListType, CommentType } from '@/lib/types/type';
import Image from 'next/image';

interface CommentDetailProps {
  data: CommentType;
  userId: number | null;
}

export default function CommentDetail({ data, userId }: CommentDetailProps) {
  return (
    <div className="relative h-full bg-background py-12">
      <div
        className="absolute left-0 top-0 h-[15px] w-full bg-cover bg-center bg-repeat-x"
        style={{ backgroundImage: 'url(/images/line-top.png)' }}
      />
      <div className="mx-auto w-full max-w-[640px]">
        <h3 className="mb-6 text-xl font-semibold">
          댓글 ({data?.totalCount})
        </h3>
        <div className="mb-10 flex items-start gap-4">
          <Image
            src="/images/profile-default.png"
            className="rounded-full"
            width={48}
            height={38}
            alt="프로필 이미지"
          />
          <textarea
            placeholder="100자 이내로 입력해주세요."
            className="h-[104px] w-full resize-none rounded-lg border-[1px] border-line-200 bg-background px-4 py-3 focus-visible:outline-black-600"
            maxLength={100}
          ></textarea>
        </div>

        {data?.list.map((comment: CommentListType) => {
          return (
            <div
              key={comment.id}
              className="flex items-start gap-4 border-t-[1px] border-t-line-200 px-6 py-[35px]"
            >
              <div className="h-[48px] w-[48px] flex-shrink-0">
                <Image
                  src={
                    comment.writer.image
                      ? comment.writer.image
                      : '/images/profile-default.png'
                  }
                  className="h-full w-full rounded-full"
                  width={48}
                  height={48}
                  alt="프로필 이미지"
                />
              </div>
              <div className="w-full">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-base font-normal text-black-300">
                    <span>{comment.writer.nickname}</span>
                    <span>1시간 전</span>
                  </div>
                  {comment.writer.id === userId && (
                    <div className="flex items-center gap-4 text-base font-normal">
                      <button
                        type="button"
                        className="text-black-600 underline"
                      >
                        수정
                      </button>
                      <button type="button" className="text-red underline">
                        삭제
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xl font-normal text-black-700">
                  {comment.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
