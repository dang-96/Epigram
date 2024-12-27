import Image from 'next/image';

export default function TodayState() {
  const EMOTION_LIST = [
    {
      text: '감동',
      image: '/images/face-inspiration.png',
    },
    {
      text: '기쁨',
      image: '/images/face-joy.png',
    },
    {
      text: '고민',
      image: '/images/face-thinking.png',
    },
    {
      text: '슬픔',
      image: '/images/face-sad.png',
    },
    {
      text: '분노',
      image: '/images/face-anger.png',
    },
  ];
  return (
    <div className="mx-auto mb-[140px] w-full max-w-[640px]">
      <h2 className="mb-10 text-2xl font-semibold text-black-600">
        오늘의 감정은 어떤가요?
      </h2>
      <ul className="flex items-center justify-between gap-4 px-12">
        {EMOTION_LIST.map((emotion, index) => {
          return (
            <li
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <button type="button">
                <span className="mb-2 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#EBEEF3]">
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
