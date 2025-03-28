import clsx from 'clsx';
import Image from 'next/image';

export default function UserEpigram() {
  const USERS_EPIGRAM_LIST = [
    {
      text: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
      author: '앙드레 말로',
      tags: ['나아가야할때', '꿈을이루고싶을때'],
    },
    {
      text: '이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는 거야. 무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지.',
      author: '파울로 코엘료',
      tags: ['나아가야할때', '꿈을이루고싶을때'],
    },
    {
      text: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
      author: '앙드레 말로',
      tags: ['나아가야할때', '꿈을이루고싶을때'],
    },
  ];
  return (
    <div className="relative w-full bg-background pb-16 pt-64 text-center">
      <h3
        className="mb-[100px] text-3xl font-bold leading-normal"
        data-aos="zoom-out-up"
        data-aos-duration="1500"
      >
        사용자들이 직접
        <br />
        인용한 에피그램들
      </h3>
      <div className="mx-auto w-full max-w-[640px]">
        {USERS_EPIGRAM_LIST.map((epigram, index) => {
          return (
            <div
              key={index}
              className={clsx(
                USERS_EPIGRAM_LIST.length === index + 1 ? 'mb-10' : 'mb-14'
              )}
              data-aos="zoom-out-up"
              data-aos-duration="1500"
              data-aos-delay={'400' + (index + 1) * 100}
            >
              <div
                className="mb-2 w-full rounded-2xl bg-cover bg-center bg-repeat-x p-6 shadow-[0_3px_12px_rgba(0,0,0,0.1)]"
                style={{ backgroundImage: 'url(/images/back-line.png)' }}
              >
                <p className="mb-5 text-left font-point text-xl font-medium text-black-600">
                  {epigram.text}
                </p>
                <span className="block text-right text-xl text-blue-400">
                  - {epigram.author} -
                </span>
              </div>
              <ul className="flex items-center justify-end gap-4">
                {epigram.tags.map((tag, index) => {
                  return (
                    <li
                      key={index}
                      className="text-xl font-medium text-blue-400"
                    >
                      #{tag}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="/icons/more-icon.svg"
          width={36}
          height={36}
          alt="더보기 아이콘"
        />
      </div>
      <div
        className="absolute bottom-0 left-0 z-10 h-[15px] w-full rotate-180 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/line-top.png)' }}
      />
    </div>
  );
}
