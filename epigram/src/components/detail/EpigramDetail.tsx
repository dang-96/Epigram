import { EpigramDetailType, Tag } from '@/lib/types/type';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import {
  deleteEpigram,
  deleteEpigramLike,
  postEpigramLike,
} from '@/lib/apis/epigram';
import { useRouter } from 'next/router';
import clsx from 'clsx';

interface EpigramDetailProps {
  data: EpigramDetailType | undefined;
  isMore: boolean;
  refetch: () => void;
}

export default function EpigramDetail({
  data,
  isMore,
  refetch,
}: EpigramDetailProps) {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>();
  const { userData } = useUserInfo();
  const router = useRouter();

  // 메뉴 열림 닫힘 토글
  const handleToggle = () => {
    setIsDropDown((prev) => !prev);
  };

  // 에피그램 삭제
  const handleDeleteEpigram = async () => {
    try {
      const res = await deleteEpigram(Number(data?.id));

      router.push('/feed');
      return res;
    } catch (error) {
      console.log('에피그램 삭제 api 호출 오류', error);
      throw new Error('에피그램 삭제 api 호출에 실패했습니다.');
    }
  };

  // 에피그램 수정
  const handleModifyEpigram = () => {
    router.push(`/write/${data?.id}`);
  };

  // 에피그램 좋아요 등록&삭제
  const handleLike = async (isLiked: boolean) => {
    try {
      const res = isLiked
        ? await deleteEpigramLike(Number(data?.id))
        : await postEpigramLike(Number(data?.id));

      setIsLike(!isLiked);
      refetch();
      return res;
    } catch (error) {
      console.log('에피그램 좋아요 API 호출 오류', error);
      throw new Error(
        isLiked
          ? '에피그램 좋아요 삭제 api 호출에 실패했습니다.'
          : '에피그램 좋아요 등록 api 호출에 실패했습니다.'
      );
    }
  };

  useEffect(() => {
    setIsLike(data?.isLiked || false);
  }, []);
  return (
    <div
      className={clsx(
        'bg-cover bg-center bg-repeat-x px-[10px] py-10',
        'xl:px-5'
      )}
      style={{ backgroundImage: 'url(/images/back-line.png)' }}
    >
      <div className="mx-auto w-full max-w-[640px]">
        <div className="relative mb-8 flex items-center justify-between">
          <ul
            className={clsx(
              'flex items-center gap-4 text-base font-normal text-blue-400',
              'xl:text-xl'
            )}
          >
            {data?.tags?.map((tag: Tag) => {
              return <li key={tag.id}>#{tag.name}</li>;
            })}
          </ul>
          {isMore && (
            <button type="button" onClick={handleToggle}>
              <Image
                src="/icons/more-icon.svg"
                className={clsx('h-6 w-6', 'xl:h-9 xl:w-9')}
                width={36}
                height={36}
                alt="더보기 버튼"
              />
            </button>
          )}

          {data?.writerId === userData?.id ? (
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
                    <button type="button" onClick={handleModifyEpigram}>
                      수정하기
                    </button>
                  </li>
                  <li className="px-8 py-3">
                    <button type="button" onClick={handleDeleteEpigram}>
                      삭제하기
                    </button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          ) : (
            ''
          )}
        </div>
        <h2
          className={clsx(
            'mb-8 text-2xl font-medium text-black-700',
            'xl:text-[32px]'
          )}
        >
          {data?.content}
        </h2>
        <span
          className={clsx(
            'mb-9 block text-right text-base font-medium text-blue-400',
            'sm:text-xl',
            'xl:text-2xl'
          )}
        >
          - {data?.author} -
        </span>
        <div
          className={clsx('flex items-center justify-center gap-2', 'xl:gap-4')}
        >
          <button
            type="button"
            className={clsx(
              'flex h-9 items-center justify-center gap-[6px] rounded-[100px] px-5 text-sm text-white hover:bg-black-600',
              'sm:text-base',
              'xl:h-12 xl:text-xl',
              isLike ? 'bg-black-600' : 'bg-gray-200'
            )}
            onClick={() => handleLike(data?.isLiked ?? false)}
          >
            <Image
              src="/icons/like-icon.svg"
              className={clsx('h-[16px] w-[18px]', 'xl:h-[21px] xl:w-[23px]')}
              width={23}
              height={21}
              alt="좋아요 아이콘"
            />
            {data?.likeCount}
          </button>
          <Link
            href={data?.referenceUrl || '/'}
            className={clsx(
              'flex h-9 items-center justify-center gap-[6px] rounded-[100px] bg-line-100 px-5 text-gray-300',
              ' sm:text-base',
              'xl:h-12 xl:text-xl'
            )}
          >
            왕도로 가는길
            <Image
              src="/icons/share-icon.svg"
              className={clsx('h-4 w-4', 'xl:h-[21px] xl:w-[21px]')}
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
