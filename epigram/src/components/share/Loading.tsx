import clsx from 'clsx';
import { SyncLoader } from 'react-spinners';

interface LoadingProps {
  height: number | string;
  width: number | string;
}

export default function Loading({ height, width }: LoadingProps) {
  return (
    <div
      className={clsx('flex items-center justify-center')}
      style={{ width: width, height: height }}
    >
      <SyncLoader color="#CBD3E1" loading={true} size={20} margin={10} />
    </div>
  );
}
