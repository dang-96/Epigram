import Image from 'next/image';

export default function Review() {
  return (
    <div className="border-line-200 w-full max-w-[640px] border-t-[1px] px-6 py-[35px]">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div
            className="mr-4 h-12 w-12 rounded-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/profile-default.png)' }}
          />
          <span className="mr-2 text-base font-normal text-black-300">
            지킬과 하이드
          </span>
          <span className="text-base font-normal text-black-300">1시간 전</span>
        </div>
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
      </div>
      <p className="pl-16 text-xl font-normal">
        오늘 하루 우울했었는데 덕분에 많은 힘 얻고 갑니다. 연금술사 책 다시 사서
        오랜만에 읽어봐야겠어요!
      </p>
    </div>
  );
}
