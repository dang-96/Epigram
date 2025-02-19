import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserInfoType } from '../types/type';

type AuthContextType = {
  loginState: boolean;
  user: UserInfoType | null;
  login: (data: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginState, setLoginState] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfoType | null>(null);

  const login = (data: any) => {
    setLoginState(true);
    setUser(data.user);

    localStorage.setItem('userInfo', JSON.stringify(data.user));
    localStorage.setItem('accessToken', data.accessToken);
  };

  const logout = () => {
    setLoginState(false);
    setUser(null);

    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
  };

  useEffect(() => {
    const storageUserInfo = localStorage.getItem('userInfo');
    const storageAccessToken = localStorage.getItem('accessToken');

    if (storageUserInfo && storageAccessToken) {
      setLoginState(true);
      setUser(JSON.parse(storageUserInfo));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginState, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): any => {
  const context = useContext(AuthContext);
  return context;
};
