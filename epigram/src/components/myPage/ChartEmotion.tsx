import Image from 'next/image';
import { VictoryPie } from 'victory';

export default function ChartEmotion() {
  const data = [
    {
      x: 'MOVED',
      y: 35,
      text: '감동',
      image: '/images/face-inspiration.png',
    },
    { x: 'HAPPY', y: 40, text: '기쁨', image: '/images/face-joy.png' },
    {
      x: 'WORRIED',
      y: 55,
      text: '고민',
      image: '/images/face-thinking.png',
    },
    { x: 'SAD', y: 60, text: '슬픔', image: '/images/face-sad.png' },
    { x: 'ANGRY', y: 45, text: '분노', image: '/images/face-anger.png' },
  ];
  const SORT_ARRAY = [...data].sort((a, b) => b.y - a.y); // 내림차순 정렬
  const LABEL_COLOR = ['#48BB98', '#FBC85B', '#C7D1E0', '#E3E9F1', '#EFF3F8']; // 차트 색상

  return (
    <div>
      <h2 className="mb-12 text-2xl font-semibold text-black-600">감정 차트</h2>
      <div className="flex items-center justify-center">
        {/* 차트 영역 */}
        <div className="relative w-full">
          <VictoryPie
            data={SORT_ARRAY}
            innerRadius={100} // 도넛 효과
            padding={80} // 차트의 패딩
            colorScale={LABEL_COLOR.map((item) => item)} // 색상 지정
            labelRadius={0} // 라벨을 바깥쪽으로 배치 (innerRadius보다 큰 값)
            labelPlacement="vertical" // 라벨을 수직으로 배치
            labels={[]}
          />
          <div className="absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-2">
            <Image
              src={SORT_ARRAY[0].image}
              width={60}
              height={60}
              alt="감정 이미지"
            />
            <span className="text-lg font-semibold">{SORT_ARRAY[0].text}</span>
          </div>
        </div>

        {/* 라벨 영역 */}
        <div>
          <ul className="w-[120px]">
            {SORT_ARRAY.map((item, index) => {
              const indexLast = SORT_ARRAY.length !== index + 1 && 'mb-[14px]';
              const indexFirst =
                index === 0 ? 'text-black-600' : 'text-gray-200';

              return (
                <li
                  key={index}
                  className={`flex items-center justify-center gap-4 ${indexLast} text-xl font-semibold ${indexFirst}`}
                >
                  <span
                    className="block h-4 w-4 rounded-sm"
                    style={{ backgroundColor: LABEL_COLOR[index] }}
                  />
                  <Image
                    src={item.image}
                    width={24}
                    height={24}
                    alt="감정 이미지"
                  />{' '}
                  {item.y}%
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
