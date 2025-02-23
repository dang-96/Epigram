import { useState } from 'react';
import { patchProfileImage } from '../apis/api';
import { UserInfoChangeType } from '../types/type';

export const useModifyNickname = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModifyNickname = async ({
    nickname,
    image,
  }: UserInfoChangeType) => {
    setIsLoading(true);

    try {
      const res = await patchProfileImage({ nickname: nickname, image: image });

      setIsLoading(false);
      setIsError(false);
      setIsOpen(false);
      return res;
    } catch (error) {
      setIsError(true);
      console.log('닉네임 변경 api 호출 에러', error);
      throw new Error('닉네임 변경에 실패했습니다.');
    }
  };

  return { isLoading, isError, isOpen, setIsOpen, handleModifyNickname };
};
