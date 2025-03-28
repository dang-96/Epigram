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
    <div className="mx-auto mb-[140px] w-full max-w-[640px]">
      <h2 className="mb-10 text-2xl font-semibold text-black-600">
        오늘의 감정은 어떤가요?
      </h2>
      {isLoading ? (
        <Loading height={128} width={640} />
      ) : (
        <ul className="flex items-center justify-between gap-4 px-12">
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
                      'mb-2 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#EBEEF3]',
                      emotionSelect && 'rounded-2xl border-4 border-[#FBC85B]'
                    )}
                  >
                    <Image
                      src={emotionValue.image}
                      width={48}
                      height={48}
                      alt={emotionValue.text}
                    />
                  </span>
                  {emotionValue.text}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
