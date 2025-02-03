import { fetchEpigramDetail } from '@/lib/apis/epigram';
import { EpigramDetailType, Tag } from '@/lib/types/type';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EpigramDetailProps {
  data: EpigramDetailType;
  isMore: boolean;
}

export default function EpigramDetail({ data, isMore }: EpigramDetailProps) {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);

  const handleToggle = () => {
    setIsDropDown((prev) => !prev);
  };
  return (
    <div
      className="bg-cover bg-center bg-repeat-x py-10"
      style={{ backgroundImage: 'url(/images/back-line.png)' }}
    >
      <div className="mx-auto w-full max-w-[640px]">
        <div className="relative mb-8 flex items-center justify-between">
          <ul className="flex items-center gap-4 text-xl font-normal text-blue-400">
            {data?.tags.map((tag: Tag) => {
              return <li key={tag.id}>#{tag.name}</li>;
            })}
          </ul>
          {isMore && (
            <button type="button" onClick={handleToggle}>
              <Image
                src="/icons/more-icon.svg"
                width={36}
                height={36}
                alt="더보기 버튼"
              />
            </button>
          )}

          <AnimatePresence>
            {isDropDown && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 top-[52px] overflow-hidden rounded-2xl border-[1px] border-blue-300 bg-background text-xl font-normal"
              >
                <li className="px-8 py-3">
                  <button type="button">수정하기</button>
                </li>
                <li className="px-8 py-3">
                  <button type="button">삭제하기</button>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <h2 className="mb-8 text-[32px] font-medium text-black-700">
          {data?.content}
        </h2>
        <span className="mb-9 block text-right text-2xl font-medium text-blue-400">
          - {data?.author} -
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
            {data?.likeCount}
          </button>
          <Link
            href={data ? data?.referenceUrl : '/'}
            className="flex h-12 items-center justify-center gap-[6px] rounded-[100px] bg-line-100 px-5 text-gray-300"
          >
            왕도로 가는길
            <Image
              src="/icons/share-icon.svg"
              width={21}
              height={21}
              alt="공유 아이콘"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
