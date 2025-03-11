import { useEmotion } from '@/lib/hooks/useEmotion';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarFilterProps {
  setEmotionFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function CalendarFilter({
  setEmotionFilter,
}: CalendarFilterProps) {
  const [selectFilter, setSelectFilter] = useState<string>('없음');
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const { EMOTION_LIST } = useEmotion();
  return (
    <>
      <div className="absolute right-[120px] top-0 h-[52px] w-36">
        <button
          type="button"
          className={clsx(
            'flex h-full w-full items-center justify-center gap-2 rounded-[14px] bg-background text-xl font-semibold ',
            isToggle
              ? 'border-2 border-black-600 text-black-600'
              : 'text-gray-200'
          )}
          onClick={() => {
            setIsToggle(!isToggle);
          }}
        >
          필터: {selectFilter}
          <span className={clsx('text-3xl', isToggle && 'text-black-600')}>
            ▾
          </span>
        </button>
      </div>
      <AnimatePresence>
        {isToggle && (
          <motion.div
            initial={{ opacity: 0, y: -10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -10, x: '-50%' }}
            transition={{ duration: 0.3 }}
            className="translate-x-[-50%]!important absolute left-[50%] top-[60px] w-full max-w-[560px] rounded-2xl bg-white shadow-[0_3px_16px_rgba(0,0,0,0.1)]"
          >
            <ul className="flex items-center justify-center gap-3 p-4">
              {EMOTION_LIST.map((emotion) => {
                return (
                  <li className="w-full">
                    <button
                      type="button"
                      className={clsx(
                        'flex h-24 w-full max-w-24 items-center justify-center rounded-2xl bg-[#EBEEF3]',
                        selectFilter === emotion?.text &&
                          'border-4 border-[#FBC85B] bg-white'
                      )}
                      onClick={() => {
                        if (selectFilter === emotion?.text) {
                          setSelectFilter('없음');
                          setEmotionFilter(null);
                        } else {
                          setSelectFilter(emotion?.text);
                          setEmotionFilter(emotion?.id);
                        }
                      }}
                    >
                      <Image
                        src={emotion?.image}
                        width={48}
                        height={48}
                        alt="감정 아이콘"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
