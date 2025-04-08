import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '../apis/api';
import { useAuth } from '../context/AuthContext';

export const useUserInfo = () => {
  const { loginState } = useAuth();
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
    // enabled: loginState,
    // retry: false,
  });

  return {
    loginState,
    userData,
    userDataLoading,
    userDataError,
    error,
    refetch,
  };
};
