import clsx from 'clsx';
import { useState } from 'react';

export default function Write() {
  const subTitleClass = 'mb-7 text-xl font-semibold';
  const contentMb = 'mb-14';
  const inputTextClass =
    'h-16 w-full rounded-xl border-[1px] border-blue-300 p-4 text-xl font-normal placeholder:text-blue-400';
  const customInputRadio =
    'flex h-6 w-6 appearance-none items-center justify-center rounded-full border-2 border-blue-300 checked:border-blue-500 checked:before:block checked:before:h-3 checked:before:w-3 checked:before:rounded-full checked:before:bg-blue-800';

  const [isButton, setIsButton] = useState<boolean>(false);
  const [isRadio, setIsRadio] = useState<string>('manual');

  return (
    <div className="py-14">
      <div className="mx-auto w-full max-w-[640px]">
        <h2 className="mb-10 text-2xl font-semibold">에피그램 만들기</h2>

        <form>
          <div className={contentMb}>
            <h3 className={subTitleClass}>
              <label htmlFor="feedContent">내용</label>{' '}
              <span className="text-lg text-red">*</span>
            </h3>
            <textarea
              id="feedContent"
              className="h-36 w-full resize-none rounded-xl border-[1px] border-blue-300 px-4 py-[10px] text-xl font-normal placeholder:text-blue-400"
              placeholder="500자 이내로 입력해주세요."
              maxLength={500}
            ></textarea>
          </div>

          <div className={contentMb}>
            <h3 className={subTitleClass}>
              저자 <span className="text-sm text-red">*</span>
            </h3>
            <div className="mb-4 flex items-center justify-start gap-6">
              <div className="flex items-center justify-start gap-2">
                <input
                  id="manual"
                  type="radio"
                  name="author"
                  className={customInputRadio}
                  checked={isRadio === 'manual'}
                  onChange={() => setIsRadio('manual')}
                />
                <label
                  htmlFor="manual"
                  className="text-xl font-medium text-black-600"
                >
                  직접 입력
                </label>
              </div>

              <div className="flex items-center justify-start gap-2">
                <input
                  id="unknown"
                  type="radio"
                  name="author"
                  className={customInputRadio}
                  checked={isRadio === 'unknown'}
                  onChange={() => setIsRadio('unknown')}
                />
                <label
                  htmlFor="unknown"
                  className="text-xl font-medium text-black-600"
                >
                  알 수 없음
                </label>
              </div>

              <div className="flex items-center justify-start gap-2">
                <input
                  id="self"
                  type="radio"
                  name="author"
                  className={customInputRadio}
                  checked={isRadio === 'self'}
                  onChange={() => setIsRadio('self')}
                />
                <label
                  htmlFor="self"
                  className="text-xl font-medium text-black-600"
                >
                  본인
                </label>
              </div>
            </div>

            <input
              type="text"
              className={inputTextClass}
              placeholder="저자 이름 입력"
            />
          </div>

          <div className={contentMb}>
            <h3 className={subTitleClass}>출처</h3>
            <input
              type="text"
              className={clsx(inputTextClass, 'mb-4')}
              placeholder="출처 제목 입력"
            />
            <input
              type="text"
              className={inputTextClass}
              placeholder="URL (ex. https://www.website.com)"
            />
          </div>

          <div className={contentMb}>
            <h3 className={subTitleClass}>태그</h3>
            <input
              type="text"
              className={inputTextClass}
              placeholder="입력하여 태그 작성 (최대 10자)"
            />
          </div>

          <div>
            <button
              type="submit"
              className={clsx(
                isButton ? 'bg-black-500' : 'bg-[#CBD3E1]',
                'h-16 w-full rounded-xl text-xl font-semibold text-white'
              )}
              disabled={!isButton}
            >
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
