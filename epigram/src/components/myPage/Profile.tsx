import Image from 'next/image';

export default function Profile() {
  return (
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
  );
}
