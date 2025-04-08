import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { UserInfoChangeType } from '@/lib/types/type';
import { useEffect } from 'react';

interface NicknameModifyModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userImage: string;
  handleModifyNickname: ({ nickname, image }: UserInfoChangeType) => void;
  refetch: () => void;
}

export default function NicknameModifyModal({
  setIsOpen,
  userImage,
  handleModifyNickname,
  refetch,
}: NicknameModifyModalProps) {
  const BUTTON_STYLE = clsx(
    'h-11 w-full rounded-lg text-base',
    'sm:w-[180px] sm:rounded-xl',
    'xl:h-[58px] xl:text-xl'
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
    setFocus,
  } = useForm();

  const onSubmit = async (data: any) => {
    const trimmedNickname = data.nickname.trim();

    try {
      await handleModifyNickname({
        nickname: trimmedNickname,
        image: userImage,
      });
      refetch();
      reset();
    } catch (error) {
      console.log('댓글 작성 에러', error);
    }
  };

  useEffect(() => {
    setFocus('nickname');
  }, []);

  return (
    <div
      className={clsx(
        'flex w-[90%] max-w-[550px] flex-col items-center rounded-2xl bg-white px-6 py-6',
        'xl:w-full xl:rounded-3xl xl:px-[38px] xl:py-10'
      )}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className={clsx('mb-6 flex items-start gap-4', 'xl:mb-10')}>
          <div className="w-full">
            <input
              type="text"
              placeholder="변경할 닉네임을 입력하세요."
              className={clsx(
                'h-11 w-full resize-none rounded-lg border-[1px] border-line-200 bg-background px-3 py-2 text-sm focus-visible:outline-black-600',
                'xl:h-[50px] xl:px-4 xl:py-3 xl:text-base'
              )}
              {...register('nickname', { required: '내용을 입력해주세요.' })}
            ></input>
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
