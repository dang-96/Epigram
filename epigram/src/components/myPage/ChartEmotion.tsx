import { fetchEmotionMonthly } from '@/lib/apis/emotion';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import { useEmotionDateStore } from '@/lib/store/useEmotionDateStore';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { VictoryPie } from 'victory';

export default function ChartEmotion() {
  const DEFAULT_DATA = [
    {
      x: 'MOVED',
      y: 0,
      text: '감동',
      image: '/images/face-inspiration.png',
      radius: 100,
    },
    {
      x: 'HAPPY',
      y: 0,
      text: '기쁨',
      image: '/images/face-joy.png',
      radius: 100,
    },
    {
      x: 'WORRIED',
      y: 0,
      text: '고민',
      image: '/images/face-thinking.png',
      radius: 100,
    },
    {
      x: 'SAD',
      y: 0,
      text: '슬픔',
      image: '/images/face-sad.png',
      radius: 100,
    },
    {
      x: 'ANGRY',
      y: 0,
      text: '분노',
      image: '/images/face-anger.png',
      radius: 100,
    },
  ];
  const { emotionDate } = useEmotionDateStore();
  const { userData } = useUserInfo();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['monthlyData', emotionDate],
    queryFn: async () => {
      const res = await fetchEmotionMonthly({
        userId: userData.id,
        month: emotionDate.getMonth() + 1,
        year: emotionDate.getFullYear(),
      });

      // 월별 감정 데이터에서 감정에 관련된 데이터만 적용
      const emotionOnly = res.map((data: any) => data.emotion);
      return emotionOnly;
    },
  });
  const [isClient, setIsClient] = useState(false);
  const [chartData, setChartData] = useState(DEFAULT_DATA);
  const SORT_ARRAY = [...chartData].sort((a, b) => b.y - a.y); // 내림차순 정렬
  const hasData = SORT_ARRAY.some((item) => item.y > 0);
  const LABEL_COLOR = ['#48BB98', '#FBC85B', '#C7D1E0', '#E3E9F1', '#EFF3F8']; // 차트 색상

  // 월별 각 감정 횟수 구하고 객체로 변환
  const emotionCounts = data?.reduce((acc: any, emotion: any) => {
    acc[emotion] = (acc[emotion] || 0) + 1;

    return acc;
  }, {});

  // 감정별 퍼센트 값 구하기
  const emotionPercentages = emotionCounts
    ? DEFAULT_DATA.map((test) => {
        const count = emotionCounts?.[test.x] || 0;
        const percentage = (count / data?.length) * 100;

        return {
          emotion: test.x,
          percentage: percentage ? percentage : 0,
        };
      })
    : [];

  // 해당 컴포넌트가 클리아언트에서만 실행되도록 적용
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 차트에 월별 감정 데이터 적용
  useEffect(() => {
    if (emotionPercentages.length > 0) {
      const updateChartData = chartData.map((item) => {
        const emotionData = emotionPercentages.find(
          (data) => data.emotion === item.x
        );

        return {
          ...item,
          y: emotionData ? emotionData.percentage : 0,
        };
      });

      setChartData(updateChartData);
    } else {
      setChartData(DEFAULT_DATA);
    }
  }, [data]);

  if (!isClient && isLoading) return <div>로딩중</div>;

  if (!isClient && isError) return <div>에러</div>;

  return (
    <div>
      <h2 className="mb-10 text-2xl font-semibold text-black-600">감정 차트</h2>
      <div className="flex min-h-[230px] items-center justify-center gap-28">
        {/* 차트 영역 */}
        <div className="relative max-h-[230px] w-full max-w-[230px]">
          <VictoryPie
            data={SORT_ARRAY} // 차트 데이터
            innerRadius={100} // 도넛 효과
            padding={0} // 차트의 패딩
            colorScale={LABEL_COLOR.map((item) => item)} // 색상 지정 (순위에 따른 색상 지정)
            labels={[]} // 차트의 label 값 지우기
            padAngle={data?.length === 1 ? 0 : 1} // 데이터 간의 간격
            cornerRadius={({ datum }) => datum.radius}
            width={hasData ? 230 : 0} // 데이터가 있으면 차트 크기 설정, 없으면 0
            height={hasData ? 230 : 0} // 데이터가 있으면 차트 크기 설정, 없으면 0
          />
          <div className="absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-2">
            <Image
              src={SORT_ARRAY[0].image}
              width={40}
              height={40}
              alt="감정 이미지"
            />
            <span className="text-lg font-semibold">{SORT_ARRAY[0].text}</span>
          </div>
        </div>

        {/* 라벨 영역 */}
        <div>
          <ul className="w-[125px]">
            {SORT_ARRAY.map((item, index) => {
              const indexLast = SORT_ARRAY.length !== index + 1 && 'mb-[14px]';
              const indexFirst =
                index === 0 ? 'text-black-600' : 'text-gray-200';

              return (
                <li
                  key={index}
                  className={`flex items-center justify-between gap-4 ${indexLast} text-xl font-semibold ${indexFirst}`}
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
                  <span className="w-[50px] text-right">{item.y}%</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
