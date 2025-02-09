import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

interface ModalFrameProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export default function ModalFrame({
  children,
  isOpen,
  setIsOpen,
}: ModalFrameProps) {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 배경 클릭 시 모달 닫기
    if (e.currentTarget === e.target) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 600);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`relative z-50 ${
        isOpen ? 'animate-modalFadeIn' : 'animate-modalFadeOut'
      }`}
      onClick={handleBackgroundClick}
    >
      <div className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.4)]">
        {children}
      </div>
    </div>
  );
}
