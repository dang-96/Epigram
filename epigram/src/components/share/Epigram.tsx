export default function Epigram() {
  return (
    <div className="mx-auto w-full max-w-[640px]">
      <div className="mb-14">
        <div
          className="mb-2 w-full rounded-2xl bg-cover bg-center bg-repeat-x p-6 shadow-[0_3px_12px_rgba(0,0,0,0.1)]"
          style={{ backgroundImage: 'url(/images/back-line.png)' }}
        >
          <p className="mb-5 text-left font-point text-xl font-medium text-black-600">
            오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.
          </p>
          <span className="block text-right text-xl text-blue-400">
            - 앙드레 말로 -
          </span>
        </div>
        <ul className="flex items-center justify-end gap-4">
          <li className="text-xl font-medium text-blue-400">#나아가야할때</li>
          <li className="text-xl font-medium text-blue-400">
            #꿈을이루고싶을때
          </li>
        </ul>
      </div>
    </div>
  );
}
