import TodayState from '@/components/main/TodayState';
import CalendarEmotion from '@/components/myPage/CalendarEmotion';
import ChartEmotion from '@/components/myPage/ChartEmotion';
import ContentAllList from '@/components/myPage/ContentAllList';
import Profile from '@/components/myPage/Profile';
import LoginMessage from '@/components/share/LoginMessage';
import { useUserInfo } from '@/lib/hooks/useUserInfo';
import clsx from 'clsx';

export default function MyPage() {
  const { loginState } = useUserInfo();

  if (!loginState) {
    return <LoginMessage />;
  }

  return (
    <div className={clsx('relative bg-background py-16', 'xl:py-32')}>
      <div
        className={clsx(
          'w-ful mb-24 h-full rounded-3xl bg-white px-[10px] pb-20',
          'xl:px-5'
        )}
      >
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
