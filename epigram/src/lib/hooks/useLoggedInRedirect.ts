import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useLoggedInReDirect = () => {
  const router = useRouter();

  useEffect(() => {
    const storageUserInfo = localStorage.getItem('userInfo');
    const storageAccessToken = localStorage.getItem('accessToken');

    if (storageUserInfo && storageAccessToken) {
      alert('로그아웃후에 진행해주세요.');
      router.push('/main');
    }
  }, []);
};
