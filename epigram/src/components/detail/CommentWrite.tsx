import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { postComment } from '@/lib/apis/comment';
import Switch from './Switch';
import { useUserInfo } from '@/lib/hooks/useUserInfo';

interface CommentWriteProps {
  epigramId: number;
  commentRefetch: () => void;
}

export default function CommentWrite({
  epigramId,
  commentRefetch,
}: CommentWriteProps) {
  const { userData, userDataLoading, userDataError, error } = useUserInfo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm();

  const [isOn, setIsOn] = useState<boolean>(false);

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };

  const onSubmit = async (data: any) => {
    const trimmedContent = data.comment.trim();

    try {
      const res = await postComment({
        epigramId: Number(epigramId),
        isPrivate: isOn,
        content: trimmedContent,
      });

      commentRefetch();
      reset();
    } catch (error) {
      console.log('댓글 작성 에러', error);
    }
  };

  if (userDataLoading) {
    return <div>로딩중</div>;
  }

  if (userDataError) {
    return (
      <p>에러 발생: {error?.message || '유저 데이터를 가져올 수 없습니다.'}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10 flex items-start gap-4">
        <div className="h-[48px] w-[48px] flex-shrink-0">
          <div
            className="mr-4 h-12 w-12 rounded-full bg-white bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${userData?.image || '/images/profile-default.png'})`,
            }}
          />
        </div>
        <div className="w-full">
          <textarea
            placeholder="100자 이내로 입력해주세요."
            className="h-[104px] w-full resize-none rounded-lg border-[1px] border-line-200 bg-background px-4 py-3 focus-visible:outline-black-600"
            maxLength={100}
            {...register('comment', { required: '내용을 입력해주세요.' })}
          ></textarea>

          <div className="mt-4 flex items-center justify-between">
            <Switch isOn={isOn} toggleSwitch={toggleSwitch} /> {/* 토글 버튼 */}
            <button
              type="submit"
              className="h-11 w-[60px] rounded-lg bg-black-500 text-base font-semibold text-white disabled:bg-gray-400"
              disabled={!isValid}
            >
              작성
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
