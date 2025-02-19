export const END_POINT = {
  epigram: {
    base: '/epigrams/',
    today: '/epigrams/today/',
    detail: {
      base: (id: number) => `/epigrams/${id}/`,
      like: (id: number) => `/epigrams/${id}/like/`,
      comments: (id: number) => `/epigrams/${id}/comments/`,
    },
  },
  emotionLog: {
    today: '/emotionLogs/today/',
    monthly: '/emotionLogs/monthly/',
  },
  comment: {
    base: '/comments/',
    detail: (id: number) => `/comments/${id}/`,
  },
  auth: {
    signUp: '/auth/signUp/',
    signIn: '/auth/signIn/',
    refresh: '/auth/refresh-token/',
  },
  user: {
    me: '/users/me/',
    detail: (id: number) => `/users/${id}/`,
    comment: (id: number) => `/users/${id}/comments/`,
  },
  image: '/images/upload',
};
