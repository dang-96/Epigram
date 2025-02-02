import { postEmotion } from '@/lib/apis/emotion';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

export default function TodayState() {
  const EMOTION_LIST = [
    {
      id: 'MOVED',
      text: '감동',
      image: '/images/face-inspiration.png',
    },
    {
      id: 'HAPPY',
      text: '기쁨',
      image: '/images/face-joy.png',
    },
    {
      id: 'WORRIED',
      text: '고민',
      image: '/images/face-thinking.png',
    },
    {
      id: 'SAD',
      text: '슬픔',
      image: '/images/face-sad.png',
    },
    {
      id: 'ANGRY',
      text: '분노',
      image: '/images/face-anger.png',
    },
  ];
  const [status, setStatus] = useState<string>('MOVED');

  const handleEmotionClick = async (emotionId: string) => {
    setStatus(emotionId);
    try {
      const response = await postEmotion(emotionId);

      if (response.status >= 200 && response.status < 300) {
        console.log(`오늘의 감정 전송 성공 했습니다.(${emotionId})`);
      }
    } catch (error) {
      console.log('감정 데이터 전송 api 호출 에러', error);
    }
  };

  return (
    <div className="mx-auto mb-[140px] w-full max-w-[640px]">
      <h2 className="mb-10 text-2xl font-semibold text-black-600">
        오늘의 감정은 어떤가요?
      </h2>
      <ul className="flex items-center justify-between gap-4 px-12">
        {EMOTION_LIST.map((emotion) => {
          return (
            <li
              key={emotion.id}
              className="flex flex-col items-center justify-center"
            >
              <button
                type="button"
                onClick={() => {
                  handleEmotionClick(emotion.id);
                }}
              >
                <span
                  className={clsx(
                    'mb-2 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#EBEEF3]',
                    emotion.id === status &&
                      'rounded-2xl border-4 border-[#FBC85B]'
                  )}
                >
                  <Image
                    src={emotion.image}
                    width={48}
                    height={48}
                    alt={emotion.text}
                  />
                </span>
                {emotion.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
