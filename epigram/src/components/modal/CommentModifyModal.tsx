import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Switch from '../detail/Switch';
import { useState } from 'react';
import clsx from 'clsx';

interface CommentModifyModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modifyComment: (param: { isPrivate: boolean; content: string }) => void;
}

export default function CommentModifyModal({
  setIsOpen,
  modifyComment,
}: CommentModifyModalProps) {
  const BUTTON_STYLE = 'h-[58px] w-[180px] rounded-xl text-xl';
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
      modifyComment({ isPrivate: isOn, content: trimmedContent });
      reset();
    } catch (error) {
      console.log('댓글 작성 에러', error);
    }
  };

  return (
    <div className="flex w-full max-w-[550px] flex-col items-center rounded-3xl bg-white px-[38px] py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-10 flex items-start gap-4">
          <div className="w-full">
            <textarea
              placeholder="100자 이내로 입력해주세요."
              className="h-[130px] w-full resize-none rounded-lg border-[1px] border-line-200 bg-background px-4 py-3 focus-visible:outline-black-600"
              maxLength={100}
              {...register('comment', { required: '내용을 입력해주세요.' })}
            ></textarea>

            <div className="mt-4 flex items-center justify-between">
              {/* 토글 버튼 */}
              <Switch isOn={isOn} toggleSwitch={toggleSwitch} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            className={clsx(
              BUTTON_STYLE,
              'bg-blue-200 font-normal text-black-700'
            )}
            onClick={() => setIsOpen(false)}
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className={clsx(
              BUTTON_STYLE,
              'bg-blue-900 font-semibold text-white disabled:bg-gray-400'
            )}
          >
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}
