import { EpigramType } from '@/lib/types/type';

interface EpigramProps {
  data?: EpigramType;
  height?: number;
}

export default function Epigram({ data, height }: EpigramProps) {
  return (
    <div className="mx-auto w-full max-w-[640px]">
      <div style={{ marginBottom: height ? '0px' : '56px' }}>
        <div
          className="mb-2 flex w-full flex-col justify-between gap-5 rounded-2xl bg-cover bg-center bg-repeat-x p-6 shadow-[0_3px_12px_rgba(0,0,0,0.1)]"
          style={{
            backgroundImage: 'url(/images/back-line.png)',
            height: height && `${height}px`,
          }}
        >
          {data ? (
            <>
              <p className="text-left font-point text-xl font-medium text-black-600">
                {data?.content}
              </p>
              <span className="block text-right text-xl text-blue-400">
                - {data?.author} -
              </span>
            </>
          ) : (
            <p className="text-center font-point text-xl font-medium leading-[1.5] text-black-600">
              에피그램이 없습니다.
              <br />
              에피그램을 작성해보세요.
            </p>
          )}
        </div>
        {data && (
          <ul className="flex items-center justify-end gap-4">
            {data?.tags.map((tag) => {
              return (
                <li key={tag.id} className="text-xl font-medium text-blue-400">
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
