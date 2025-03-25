import TodayState from '@/components/main/TodayState';
import CalendarEmotion from '@/components/myPage/CalendarEmotion';
import ChartEmotion from '@/components/myPage/ChartEmotion';
import ContentAllList from '@/components/myPage/ContentAllList';
import Profile from '@/components/myPage/Profile';
import LoginMessage from '@/components/share/LoginMessage';
import { useUserInfo } from '@/lib/hooks/useUserInfo';

export default function MyPage() {
  const { loginState } = useUserInfo();

  if (!loginState) {
    return <LoginMessage />;
  }

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
