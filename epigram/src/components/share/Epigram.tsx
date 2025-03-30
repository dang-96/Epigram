import { EpigramType } from '@/lib/types/type';
import clsx from 'clsx';
import { useRouter } from 'next/router';

interface EpigramProps {
  data?: EpigramType;
  height?: number;
}

export default function Epigram({ data, height }: EpigramProps) {
  const router = useRouter();

  const navigateToPage = () => {
    if (data?.id) {
      router.push(`/feed/${data.id}`);
    }
  };
  return (
    <div className="mx-auto w-full max-w-[640px]">
      <div style={{ marginBottom: height ? '0px' : '16px' }}>
        <div
          className={clsx(
            'mb-2 flex w-full flex-col gap-5 rounded-2xl bg-cover bg-center bg-repeat-x p-6 shadow-[0_3px_12px_rgba(0,0,0,0.1)]',
            data
              ? 'cursor-pointer justify-between'
              : 'cursor-auto justify-center'
          )}
          style={{
            backgroundImage: 'url(/images/back-line.png)',
            height: height && `${height}px`,
          }}
          onClick={navigateToPage}
        >
          {data ? (
            <>
              <p
                className={clsx(
                  'text-left font-point text-sm font-medium text-black-600',
                  'sm:text-base',
                  'xl:text-xl'
                )}
              >
                {data?.content}
              </p>
              <span
                className={clsx(
                  'block text-right text-sm text-blue-400',
                  'sm:text-base',
                  'xl:text-xl'
                )}
              >
                - {data?.author} -
              </span>
            </>
          ) : (
            <p
              className={clsx(
                'text-center font-point text-sm font-medium leading-[1.5] text-black-600',
                'sm:text-base',
                'xl:text-xl'
              )}
            >
              에피그램이 없습니다.
              <br />
              에피그램을 작성해보세요.
            </p>
          )}
        </div>
        {data && (
          <ul className="flex items-center justify-end gap-4">
            {data?.tags?.map((tag) => {
              return (
                <li
                  key={tag.id}
                  className={clsx(
                    'text-sm font-medium text-blue-400',
                    'sm:text-base',
                    'xl:text-xl'
                  )}
                >
                  #{tag.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
