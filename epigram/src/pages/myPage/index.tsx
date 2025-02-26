import NewEpigram from '@/components/main/NewEpigram';
import NewEpigramList from '@/components/main/NewEpigramList';
import TodayState from '@/components/main/TodayState';
import Profile from '@/components/myPage/Profile';
import { useState } from 'react';
import { match } from 'ts-pattern';

export default function MyPage() {
  const EPIGRAM = 'epigram';
  const COMMENT = 'comment';
  const [myPageTab, setMyPageTab] = useState<string>(EPIGRAM);

  const handleTab = (tab: string) => {
    setMyPageTab(tab);
  };
  return (
    <div className="relative bg-background py-32">
      <div className="w-ful mb-24 h-full rounded-3xl bg-white pb-20">
        <div className="mx-auto w-full max-w-[640px]">
          <Profile />

          <TodayState />

          <div className="mb-40">달력 영역</div>

          <div>
            <h2 className="mb-12 text-2xl font-semibold text-black-600">
              감정 차트
            </h2>
            <div>차트 영역</div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[640px]">
        <div className="mb-12">
          <button type="button" onClick={() => handleTab(EPIGRAM)}>
            내 에피그램(11)
          </button>
          <button type="button" onClick={() => handleTab(COMMENT)}>
            내 댓글(11)
          </button>
        </div>
        {match(myPageTab)
          .with(EPIGRAM, () => <NewEpigram />)
          .with(COMMENT, () => <div>댓글 리스트</div>)
          .otherwise(() => '')}
      </div>
    </div>
  );
}
