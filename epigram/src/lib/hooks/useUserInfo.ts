import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '../apis/api';

export const useUserInfo = () => {
  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError,
    error,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await fetchUserInfo();

      console.log(res);
      return res;
    },
  });

  return { userData, userDataLoading, userDataError, error };
};
