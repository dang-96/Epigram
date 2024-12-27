import Epigram from '../share/Epigram';

export default function TodayEpigram() {
  return (
    <div className="mx-auto mb-[140px] w-full max-w-[640px]">
      <h2 className="mb-10 text-2xl font-semibold text-black-600">
        오늘의 에피그램
      </h2>
      <Epigram />
    </div>
  );
}
