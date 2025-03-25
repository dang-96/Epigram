import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Image from 'next/image';
import { useEmotion } from '@/lib/hooks/useEmotion';
import { useQuery } from '@tanstack/react-query';
import { fetchEmotionMonthly } from '@/lib/apis/emotion';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import { EmotionMonthlyType } from '@/lib/types/type';
import CalendarFilter from './CalendarFilter';
import { useEmotionDateStore } from '@/lib/store/useEmotionDateStore';
import Loading from '../share/Loading';

export default function CalendarEmotion() {
  const { emotionDate, setEmotionDate } = useEmotionDateStore();
  const [currentDate, setCurrentDate] = useState<any>(null);
  const { EMOTION_LIST } = useEmotion();
  const { userData, userDataLoading, userDataError } = useUserInfo();
  const [emotionFilter, setEmotionFilter] = useState<string | null>(null);

  const {
    data: emotionData,
    isLoading: emotionLoading,
    isError: emotionError,
  } = useQuery({
    queryKey: ['emotion', currentDate],
    queryFn: async () => {
      const monthsToFetch = [
        {
          // 현재 달
          year: currentDate.getFullYear(),
          month: currentDate.getMonth(),
        },
        {
          // 이전 달
          year:
            currentDate.getMonth() === 0
              ? currentDate.getFullYear() - 1
              : currentDate.getFullYear(),
          month: currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1,
        },
        {
          // 다음 달
          year:
            currentDate.getMonth() === 11
              ? currentDate.getFullYear() + 1
              : currentDate.getFullYear(),
          month: currentDate.getMonth() === 11 ? 0 : currentDate.getMonth() + 1,
        },
      ];

      const res = await Promise.all(
        monthsToFetch.map(({ year, month }) =>
          fetchEmotionMonthly({
            userId: userData?.id,
            year,
            month: month + 1,
          })
        )
      );

      return res;
    },
    enabled: !!currentDate && !!userData,
  });
  const allEmotionData = emotionData?.flat();

  // 달력 이전달 이동
  const handlePreviousMonth = () => {
    const newDate = new Date(emotionDate);
    newDate.setMonth(emotionDate.getMonth() - 1);
    setEmotionDate(newDate);
    setCurrentDate(newDate);
  };

  // 달력 다음달 이동
  const handleNextMonth = () => {
    const newDate = new Date(emotionDate);
    newDate.setMonth(emotionDate.getMonth() + 1);
    setEmotionDate(newDate);
    setCurrentDate(newDate);
  };

  const findEmotionData = (date: any) => {
    const matchData = allEmotionData?.find((emotion: EmotionMonthlyType) => {
      const isSameDate =
        new Date(emotion.createdAt).toDateString() === date.toDateString();
      // emotionFilter가 없으면 모든 감정 데이터가 일치하도록
      const isEmotionMatched =
        !emotionFilter || emotion.emotion === emotionFilter;

      return isSameDate && isEmotionMatched; // 날짜가 일치하면 모든 감정을 반환
    });

    if (matchData) {
      return {
        id: matchData.id,
        emotion: matchData.emotion,
        createdAt: matchData.createdAt,
        userId: matchData.userId,
      };
    }
  };

  const findEmotionImage = (data: string) => {
    const matchImage = EMOTION_LIST.find((emotion) => {
      return emotion.id === data;
    });

    return matchImage?.image;
  };

  // 달력에 class 추가
  const tileClassName = ({ date, view }: any) => {
    if (view !== 'month') return '';

    // 필터에 값이 있으면 해당 값과 일치하는지 여부 확인 없으면 필터적용없이 확인
    const matchEmotion = emotionFilter
      ? findEmotionData(date)?.emotion === emotionFilter
      : findEmotionData(date);

    // 해당 필터 값과 일치하는 날짜에만 클래스 추가
    if (matchEmotion) {
      return 'emotion';
    }

    return '';
  };

  // 달력에 감정 아이콘 추가
  const tileContent = ({ date, view }: any) => {
    if (view !== 'month') return '';

    const matchEmotionDate = findEmotionData(date);
    if (!matchEmotionDate) return null;
    const matchEmotionImage = findEmotionImage(matchEmotionDate?.emotion);

    if (matchEmotionImage) {
      return (
        <div className="emotionImage">
          <Image
            src={matchEmotionImage}
            width={36}
            height={36}
            alt="감정 아이콘"
          />
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  if (emotionLoading && userDataLoading)
    return <Loading height={640} width={640} />;

  if (emotionError && userDataError) return <div>에러</div>;

  return (
    <div className="mb-40">
      {currentDate && (
        <div className="calendar-custom">
          <div className="absolute right-0 top-0 flex h-[52px] items-center gap-6">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center"
              onClick={handlePreviousMonth}
            >
              <Image
                className="h-5 w-[10px]"
                src="/icons/left-arrow-icon.svg"
                width={10}
                height={20}
                alt="왼쪽 화살표"
              />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center"
              onClick={handleNextMonth}
            >
              <Image
                className="h-5 w-[10px]"
                src="/icons/right-arrow-icon.svg"
                width={10}
                height={20}
                alt="오른쪽 화살표"
              />
            </button>
          </div>
          <CalendarFilter setEmotionFilter={setEmotionFilter} />
          <Calendar
            value={currentDate}
            onChange={setCurrentDate}
            selectRange={false}
            locale="ko-KR"
            calendarType="hebrew"
            formatDay={(locale, date) => date.getDate().toString()}
            next2Label={null}
            prev2Label={null}
            nextLabel={null}
            prevLabel={null}
            navigationLabel={({ label }) => (
              <span className="text-2xl font-semibold text-black-600">
                {label}
              </span>
            )}
            onActiveStartDateChange={({ activeStartDate }) => {
              setEmotionDate(activeStartDate); // 달력의 표시된 월만 변경
            }}
            activeStartDate={emotionDate} // viewDate에 해당하는 월을 달력에 표시
            tileClassName={tileClassName}
            tileContent={tileContent}
          />
        </div>
      )}
    </div>
  );
}
