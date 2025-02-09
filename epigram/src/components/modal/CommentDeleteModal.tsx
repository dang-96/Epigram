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
  const BUTTON_STYLE = 'h-[58px] w-[180px] rounded-xl text-xl';

  return (
    <div className="flex h-[330px] w-[450px] flex-col items-center rounded-3xl bg-white px-[38px] py-10">
      <Image
        src="/icons/modal-icon.svg"
        width={56}
        height={56}
        className="mb-6"
        alt="모달 아이콘"
      />
      <div className="mb-10 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-black-700">
          댓글을 삭제하시겠어요?
        </h2>
        <span className="text-lg font-normal text-gray-400">
          댓글은 삭제 후 복구할 수 없어요.
        </span>
      </div>
      <div className="flex items-center justify-center gap-4">
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
