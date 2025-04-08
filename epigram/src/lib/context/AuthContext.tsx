import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserInfoType } from '../types/type';

type AuthContextType = {
  loginState: boolean | null;
  user: UserInfoType | null;
  login: (data: any) => void;
  logout: () => void;
  setLoginState: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginState, setLoginState] = useState<boolean | null>(false);
  const [user, setUser] = useState<UserInfoType | null>(null);

  const login = (data: any) => {
    setLoginState(true);
    setUser(data.user);

    localStorage.setItem('userInfo', JSON.stringify(data.user));
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  };

  const logout = () => {
    setLoginState(false);
    setUser(null);

    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  useEffect(() => {
    const storageUserInfo = localStorage.getItem('userInfo');
    const storageAccessToken = localStorage.getItem('accessToken');
    const storageRefreshToken = localStorage.getItem('refreshToken');

    if (storageUserInfo && storageAccessToken && storageRefreshToken) {
      setLoginState(true);
      setUser(JSON.parse(storageUserInfo));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ loginState, user, login, logout, setLoginState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): any => {
  const context = useContext(AuthContext);
  return context;
};
