import NewEpigram from '@/components/main/NewEpigram';
import NewReviewList from '@/components/main/NewReviewList';
import TodayEpigram from '@/components/main/TodayEpigram';
import TodayState from '@/components/main/TodayState';
import FixedMenu from '@/components/share/FixedMenu';
import Review from '@/components/share/Review';

export default function MainPage() {
  return (
    <div className="h-full bg-background py-[120px]">
      <TodayEpigram />
      <TodayState />
      <NewEpigram />
      <NewReviewList />
      <FixedMenu />
    </div>
  );
}
