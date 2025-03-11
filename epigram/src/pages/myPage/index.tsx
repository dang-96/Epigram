import TodayState from '@/components/main/TodayState';
import CalendarEmotion from '@/components/myPage/CalendarEmotion';
import ChartEmotion from '@/components/myPage/ChartEmotion';
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
          <ChartEmotion />
        </div>
      </div>
      <ContentAllList />
    </div>
  );
}
