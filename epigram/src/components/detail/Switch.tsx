import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SwitchProps {
  isOn: boolean;
  toggleSwitch: () => void;
}

export default function Switch({ isOn, toggleSwitch }: SwitchProps) {
  const PC_MOVE = 17;
  const MB_MOVE = 15;
  const [toggleMove, setToggleMove] = useState<number>(PC_MOVE);

  useEffect(() => {
    const handleResize = () => {
      setToggleMove(window.innerWidth >= 1280 ? PC_MOVE : MB_MOVE);
    };

    handleResize();
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('scroll', handleResize);
    };
  }, []);

  return (
    <button
      type="button"
      className="flex items-center gap-2"
      onClick={toggleSwitch}
    >
      <span
        className={clsx(
          'block text-left text-sm font-semibold text-gray-400',
          'xl:text-base',
          isOn ? 'text-gray-200' : 'text-[#1F2937]'
        )}
      >
        공개
      </span>
      <motion.div
        className={clsx(
          'relative flex h-5 w-9 items-center rounded-full p-1',
          'xl:h-6 xl:w-[42px]'
        )}
        animate={{
          backgroundColor: isOn ? '#D1D5DB' : '#1F2937',
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={clsx(
            'h-3 w-3 rounded-full bg-white shadow',
            'xl:h-4 xl:w-4'
          )}
          animate={{
            x: isOn ? 0 : toggleMove,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </button>
  );
}
