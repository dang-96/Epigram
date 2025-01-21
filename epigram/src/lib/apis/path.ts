const END_POINT = {
  epigram: {
    base: '/epigrams/',
    today: '/epigrams/today/',
    detail: {
      base: (id: string) => `/epigrams/${id}/`,
      like: (id: string) => `/epigrams/${id}/like/`,
      comments: (id: string) => `/epigrams/${id}/comments/`,
    },
  },
  emotionLog: {
    today: '/emotionLogs/today/',
    monthly: '/emotionLogs/monthly/',
  },
  comment: {
    base: '/comments/',
    detail: (id: string) => `/comments/${id}/`,
  },
  auth: {
    signUp: '/auth/signUp/',
    signIn: '/auth/signIn/',
    refresh: '/auth/refresh-token/',
  },
  user: {
    me: '/users/me/',
    detail: (id: string) => `/users/${id}/`,
    comment: (id: string) => `/users/${id}/comments/`,
  },
};
