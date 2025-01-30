import { useQuery } from '@tanstack/react-query';
import Epigram from '../share/Epigram';
import { fetchTodayEpigram } from '@/lib/apis/epigram';

export default function TodayEpigram() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todayEpigram'],
    queryFn: async () => {
      const res = await fetchTodayEpigram();
      return res?.data;
    },
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <div className="mx-auto mb-[140px] w-full max-w-[640px]">
      <h2 className="mb-10 text-2xl font-semibold text-black-600">
        오늘의 에피그램
      </h2>
      <Epigram data={data} />
    </div>
  );
}
