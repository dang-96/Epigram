import NewEpigram from '@/components/main/NewEpigram';
import TodayState from '@/components/main/TodayState';
import Image from 'next/image';

export default function MyPage() {
  return (
    <div className="relative bg-background py-32">
      <div className="w-ful mb-24 h-full rounded-3xl bg-white pb-20">
        <div className="mx-auto w-full max-w-[640px]">
          <div className="mb-24 flex translate-y-[-60px] flex-col items-center justify-center">
            <Image
              src="/images/profile-default.png"
              className="h-[120px] w-[120px] rounded-full border-2 border-blue-300 bg-white"
              width={120}
              height={120}
              alt="프로필 이미지"
            />
            <span className="mb-6 mt-4 block text-2xl font-medium text-black-950">
              김코드
            </span>
            <button
              type="button"
              className="h-12 w-[100px] rounded-[100px] bg-line-100 text-xl font-medium text-gray-300"
            >
              로그아웃
            </button>
          </div>

          <TodayState />

          <div className="mb-40">달력 영역</div>

          <div>
            <h2 className="mb-12 text-2xl font-semibold text-black-600">
              감정 차트
            </h2>
            <div>차트 영역</div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[640px]">
        <div className="mb-12">
          <button type="button">내 에피그램(11)</button>
          <button type="button">내 댓글(11)</button>
        </div>
        <NewEpigram marginBottom={'mb-0'} />
      </div>
    </div>
  );
}
