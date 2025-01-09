import Image from 'next/image';
import Link from 'next/link';

export default function SearchPage() {
  return (
    <div className="mx-auto my-[46px] w-full max-w-[640px]">
      <div className="mb-10 flex items-center justify-between border-b-4 border-b-black-800 pb-[22px]">
        <input
          type="text"
          className="h-8 w-full text-2xl font-normal focus-visible:outline-none"
          placeholder="검색어를 입력해주세요."
        />
        <button type="button">
          <Image
            src="/icons/search-icon.svg"
            width={36}
            height={36}
            alt="검색 아이콘"
          />
        </button>
      </div>

      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-2xl font-medium">최근 검색어</h2>
        <button type="button" className="text-base font-semibold text-red">
          모두 지우기
        </button>
      </div>

      <ul className="mb-10 flex flex-wrap items-center gap-4">
        <li className="rounded-[22px] bg-background px-[14px] py-3 text-2xl font-normal text-black-300">
          <button type="button">꿈</button>
        </li>
        <li className="rounded-[22px] bg-background px-[14px] py-3 text-2xl font-normal text-black-300">
          <button type="button">#나아가야할때</button>
        </li>
        <li className="rounded-[22px] bg-background px-[14px] py-3 text-2xl font-normal text-black-300">
          <button type="button">기분</button>
        </li>
        <li className="rounded-[22px] bg-background px-[14px] py-3 text-2xl font-normal text-black-300">
          <button type="button">응원</button>
        </li>
        <li className="rounded-[22px] bg-background px-[14px] py-3 text-2xl font-normal text-black-300">
          <button type="button">꿈을이루고싶을때</button>
        </li>
        <li className="rounded-[22px] bg-background px-[14px] py-3 text-2xl font-normal text-black-300">
          <button type="button">슬픔</button>
        </li>
        <li className="rounded-[22px] bg-background px-[14px] py-3 text-2xl font-normal text-black-300">
          <button type="button">응원받고싶을때</button>
        </li>
      </ul>

      <div className="border-b-[1px] border-b-gray-100 p-6">
        <Link
          href="/"
          className="font-point text-xl font-medium text-black-600"
        >
          오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.
        </Link>
        <span className="mt-6 block text-xl font-medium text-blue-400">
          - 앙드레 말로 -
        </span>
        <ul className="flex flex-wrap items-center justify-end gap-3">
          <li className="text-xl font-normal text-blue-400">#동기부여</li>
          <li className="text-xl font-normal text-blue-400">#우울할때</li>
          <li className="text-xl font-normal text-blue-400">#나아가야할때</li>
        </ul>
      </div>
      <div className="border-b-[1px] border-b-gray-100 p-6">
        <Link
          href="/"
          className="font-point text-xl font-medium text-black-600"
        >
          오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.
        </Link>
        <span className="mt-6 block text-xl font-medium text-blue-400">
          - 앙드레 말로 -
        </span>
        <ul className="flex flex-wrap items-center justify-end gap-3">
          <li className="text-xl font-normal text-blue-400">#동기부여</li>
          <li className="text-xl font-normal text-blue-400">#우울할때</li>
          <li className="text-xl font-normal text-blue-400">#나아가야할때</li>
        </ul>
      </div>
      <div className="border-b-[1px] border-b-gray-100 p-6">
        <Link
          href="/"
          className="font-point text-xl font-medium text-black-600"
        >
          오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.
        </Link>
        <span className="mt-6 block text-xl font-medium text-blue-400">
          - 앙드레 말로 -
        </span>
        <ul className="flex flex-wrap items-center justify-end gap-3">
          <li className="text-xl font-normal text-blue-400">#동기부여</li>
          <li className="text-xl font-normal text-blue-400">#우울할때</li>
          <li className="text-xl font-normal text-blue-400">#나아가야할때</li>
        </ul>
      </div>
      <div className="border-b-[1px] border-b-gray-100 p-6">
        <Link
          href="/"
          className="font-point text-xl font-medium text-black-600"
        >
          오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.
        </Link>
        <span className="mt-6 block text-xl font-medium text-blue-400">
          - 앙드레 말로 -
        </span>
        <ul className="flex flex-wrap items-center justify-end gap-3">
          <li className="text-xl font-normal text-blue-400">#동기부여</li>
          <li className="text-xl font-normal text-blue-400">#우울할때</li>
          <li className="text-xl font-normal text-blue-400">#나아가야할때</li>
        </ul>
      </div>
    </div>
  );
}
