import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '../apis/api';

export const useUserInfo = () => {
  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await fetchUserInfo();

      return res;
    },
  });

  return { userData, userDataLoading, userDataError, error, refetch };
};
