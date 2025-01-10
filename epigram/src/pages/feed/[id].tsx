import Image from 'next/image';
import { useState } from 'react';

export default function DetailPage() {
  const [isMenu, setIsMenu] = useState<boolean>(false);

  return (
    <div>
      <div
        className="bg-cover bg-center bg-repeat-x py-10"
        style={{ backgroundImage: 'url(/images/back-line.png)' }}
      >
        <div className="mx-auto w-full max-w-[640px]">
          <div className="relative mb-8 flex items-center justify-between">
            <ul className="flex items-center gap-4 text-xl font-normal text-blue-400">
              <li>#꿈을이루고싶을때</li>
              <li>#나아가야할때</li>
            </ul>
            <button type="button">
              <Image
                src="/icons/more-icon.svg"
                width={36}
                height={36}
                alt="더보기 버튼"
              />
            </button>
            <ul className="absolute right-0 top-[52px] overflow-hidden rounded-2xl border-[1px] border-blue-300 bg-background text-xl font-normal">
              <li className="px-8 py-3">
                <button type="button">수정하기</button>
              </li>
              <li className="px-8 py-3">
                <button type="button">삭제하기</button>
              </li>
            </ul>
          </div>
          <h2 className="mb-8 text-[32px] font-medium text-black-700">
            오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.
          </h2>
          <span className="mb-9 block text-right text-2xl font-medium text-blue-400">
            - 앙드레 말로 -
          </span>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              className="flex h-12 items-center justify-center gap-[6px] rounded-[100px] bg-black-600 px-5 text-white"
            >
              <Image
                src="/icons/like-icon.svg"
                width={23}
                height={21}
                alt="좋아요 아이콘"
              />
              123
            </button>
            <button
              type="button"
              className="flex h-12 items-center justify-center gap-[6px] rounded-[100px] bg-line-100 px-5 text-gray-300"
            >
              왕도로 가는길
              <Image
                src="/icons/share-icon.svg"
                width={21}
                height={21}
                alt="공유 아이콘"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="relative h-full bg-background py-12">
        <div
          className="absolute left-0 top-0 h-[15px] w-full bg-cover bg-center bg-repeat-x"
          style={{ backgroundImage: 'url(/images/line-top.png)' }}
        />
        <div className="mx-auto w-full max-w-[640px]">
          <h3 className="mb-6 text-xl font-semibold">댓글 (3)</h3>
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

          <div className="flex items-start gap-4 border-t-[1px] border-t-line-200 px-6 py-[35px]">
            <Image
              src="/images/profile-default.png"
              className="rounded-full"
              width={48}
              height={38}
              alt="프로필 이미지"
            />
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-base font-normal text-black-300">
                  <span>지킬과 하이드</span>
                  <span>1시간 전</span>
                </div>
                <div className="flex items-center gap-4 text-base font-normal">
                  <button type="button" className="text-black-600 underline">
                    수정
                  </button>
                  <button type="button" className="text-red underline">
                    삭제
                  </button>
                </div>
              </div>
              <p className="text-xl font-normal text-black-700">
                오늘 하루 우울했었는데 덕분에 많은 힘 얻고 갑니다. 연금술사 책
                다시 사서 오랜만에 읽어봐야겠어요!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t-[1px] border-t-line-200 px-6 py-[35px]">
            <Image
              src="/images/profile-default.png"
              className="rounded-full"
              width={48}
              height={38}
              alt="프로필 이미지"
            />
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-base font-normal text-black-300">
                  <span>지킬과 하이드</span>
                  <span>1시간 전</span>
                </div>
              </div>
              <p className="text-xl font-normal text-black-700">
                오늘 하루 우울했었는데 덕분에 많은 힘 얻고 갑니다. 연금술사 책
                다시 사서 오랜만에 읽어봐야겠어요!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t-[1px] border-t-line-200 px-6 py-[35px]">
            <Image
              src="/images/profile-default.png"
              className="rounded-full"
              width={48}
              height={38}
              alt="프로필 이미지"
            />
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-base font-normal text-black-300">
                  <span>지킬과 하이드</span>
                  <span>1시간 전</span>
                </div>
              </div>
              <p className="text-xl font-normal text-black-700">
                오늘 하루 우울했었는데 덕분에 많은 힘 얻고 갑니다. 연금술사 책
                다시 사서 오랜만에 읽어봐야겠어요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
