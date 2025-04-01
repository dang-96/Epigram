import { fetchEmotion } from '@/lib/apis/emotion';
import { useEmotion } from '@/lib/hooks/useEmotion';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import { useLoadingStore } from '@/lib/store/useLoadingStore';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect } from 'react';
import Loading from '../share/Loading';

export default function TodayState() {
  const { setAllLoading } = useLoadingStore();
  const { EMOTION_LIST, emotion, handleEmotionClick } = useEmotion();
  const { userData } = useUserInfo();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todayEmotion'],
    queryFn: async () => {
      const res = await fetchEmotion(userData.id);
      return res;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setAllLoading(false);
    }
  }, [isLoading]);

  if (isError) return <div>에러</div>;

  return (
    <div
      className={clsx('mx-auto mb-14 w-full max-w-[640px]', 'xl:mb-[140px]')}
    >
      <h2
        className={clsx(
          'mb-6 text-base font-semibold text-black-600',
          'xl:mb-10 xl:text-2xl'
        )}
      >
        오늘의 감정은 어떤가요?
      </h2>
      {isLoading ? (
        <Loading height={128} width={640} />
      ) : (
        <ul
          className={clsx(
            'flex items-center justify-between gap-2 px-0',
            'sm:gap-4 sm:px-12'
          )}
        >
          {EMOTION_LIST.map((emotionValue) => {
            const emotionSelect = data
              ? emotionValue.id === data.emotion
              : emotionValue.id === emotion.id;
            return (
              <li
                key={emotionValue.id}
                className="flex flex-col items-center justify-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    handleEmotionClick({
                      emotionId: emotionValue.id,
                      emotionText: emotionValue.text,
                      emotionImage: emotionValue.image,
                    });
                  }}
                >
                  <span
                    className={clsx(
                      'mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EBEEF3]',
                      'sm:h-24 sm:w-24',
                      // 'xl:h-24 xl:w-24',
                      emotionSelect && 'rounded-2xl border-4 border-[#FBC85B]'
                    )}
                  >
                    <Image
                      src={emotionValue.image}
                      className={clsx('h-8 w-8', 'sm:h-12 sm:w-12')}
                      width={48}
                      height={48}
                      alt={emotionValue.text}
                    />
                  </span>
                  <span
                    className={clsx('text-sm text-gray-400', 'xl:text-base')}
                  >
                    {emotionValue.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
