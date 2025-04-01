import Image from 'next/image';
import clsx from 'clsx';

interface CommentDeleteModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteComment: () => void;
}

export default function CommentDeleteModal({
  setIsOpen,
  deleteComment,
}: CommentDeleteModalProps) {
  const BUTTON_STYLE = clsx(
    'h-11 w-full rounded-lg text-base',
    'sm:w-[180px] sm:rounded-xl',
    'xl:h-[58px] xl:text-xl'
  );

  return (
    <div
      className={clsx(
        'flex h-[280px] w-[90%] max-w-[450px] flex-col items-center justify-center rounded-3xl bg-white px-6 py-6',
        'sm:w-full',
        'xl:h-[330px] xl:px-[38px] xl:py-10'
      )}
    >
      <Image
        src="/icons/modal-icon.svg"
        width={56}
        height={56}
        className={clsx('mb-5 h-11 w-11', 'xl:mb-6 xl:h-14 xl:w-14')}
        alt="모달 아이콘"
      />
      <div className={clsx('mb-6 text-center', 'xl:mb-10')}>
        <h2
          className={clsx(
            'mb-2 text-xl font-semibold text-black-700',
            'xl:mb-4 xl:text-2xl'
          )}
        >
          댓글을 삭제하시겠어요?
        </h2>
        <span className="text-lg font-normal text-gray-400">
          댓글은 삭제 후 복구할 수 없어요.
        </span>
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        <button
          type="button"
          className={clsx(
            BUTTON_STYLE,
            'bg-blue-200 font-normal text-black-700'
          )}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          취소
        </button>
        <button
          type="button"
          className={clsx(BUTTON_STYLE, 'bg-blue-900 font-semibold text-white')}
          onClick={() => {
            deleteComment();
          }}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}
