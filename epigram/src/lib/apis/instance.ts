import axios from 'axios';
import { postRefreshToken } from './api';
import { useAuth } from '../context/AuthContext';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    // 'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  // 성공적인 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 엑세스 토큰 만료된 경우 (401 오류)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 리프레시 토큰을 사용하여 새로운 엑세스 토큰 요청
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        console.log('리프레시 토큰이 없습니다.');
        throw new Error('No refresh token available');
      }

      try {
        const res = await postRefreshToken(refreshToken);
        // console.log(res.accessToken);

        // 새로운 엑세스 토큰 저장
        localStorage.setItem('accessToken', res.accessToken);

        // 요청 헤더에 새로운 엑세스 토큰 추가 후, 원래의 요청을 재시도
        originalRequest.headers['Authorization'] = `Bearer ${res.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰이 만료되었거나 오류가 발생한 경우 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
