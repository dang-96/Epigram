import NewCommentList from '@/components/main/NewCommentList';
import TodayEpigram from '@/components/main/TodayEpigram';
import TodayState from '@/components/main/TodayState';
import FixedMenu from '@/components/share/FixedMenu';
import NewEpigramList from '@/components/main/NewEpigramList';

export default function MainPage() {
  return (
    <div className="h-full bg-background py-[120px]">
      <TodayEpigram />
      <TodayState />
      <NewEpigramList />
      <NewCommentList />
      <FixedMenu />
    </div>
  );
}
