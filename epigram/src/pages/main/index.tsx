import NewCommentList from '@/components/main/NewCommentList';
import TodayEpigram from '@/components/main/TodayEpigram';
import TodayState from '@/components/main/TodayState';
import FixedMenu from '@/components/share/FixedMenu';
import NewEpigramList from '@/components/main/NewEpigramList';
import LoginMessage from '@/components/share/LoginMessage';
import { useAuth } from '@/lib/context/AuthContext';

export default function MainPage() {
  const { loginState } = useAuth();

  if (!loginState) {
    return <LoginMessage />;
  }

  return (
    <div className="h-full bg-background py-[120px]">
      <TodayEpigram />
      <TodayState />
      <NewEpigramList />
      <NewCommentList />
    </div>
  );
}
