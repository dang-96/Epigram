import TodayState from '@/components/main/TodayState';
import CalendarEmotion from '@/components/myPage/CalendarEmotion';
import ContentAllList from '@/components/myPage/ContentAllList';
import Profile from '@/components/myPage/Profile';

export default function MyPage() {
  return (
    <div className="relative bg-background py-32">
      <div className="w-ful mb-24 h-full rounded-3xl bg-white pb-20">
        <div className="mx-auto w-full max-w-[640px]">
          <Profile />

          <TodayState />

          <CalendarEmotion />

          <div>
            <h2 className="mb-12 text-2xl font-semibold text-black-600">
              감정 차트
            </h2>
            <div>차트 영역</div>
          </div>
        </div>
      </div>
      <ContentAllList />
    </div>
  );
}
