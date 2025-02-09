import clsx from 'clsx';
import { motion } from 'framer-motion';

interface SwitchProps {
  isOn: boolean;
  toggleSwitch: () => void;
}

export default function Switch({ isOn, toggleSwitch }: SwitchProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2"
      onClick={toggleSwitch}
    >
      <span
        className={clsx(
          'block text-left text-base font-semibold text-gray-400',
          isOn ? 'text-gray-200' : 'text-[#1F2937]'
        )}
      >
        공개
      </span>
      <motion.div
        className="relative flex h-6 w-[42px] items-center rounded-full p-1"
        animate={{
          backgroundColor: isOn ? '#D1D5DB' : '#1F2937',
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="h-4 w-4 rounded-full bg-white shadow"
          animate={{
            x: isOn ? 0 : 17,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </button>
  );
}
