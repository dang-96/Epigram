import Image from 'next/image';
import clsx from 'clsx';

export default function ReviewModal() {
  const BUTTON_STYLE = 'h-[58px] w-[180px] rounded-xl text-xl';

  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.4)]">
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
          >
            취소
          </button>
          <button
            type="button"
            className={clsx(
              BUTTON_STYLE,
              'bg-blue-900 font-semibold text-white'
            )}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
