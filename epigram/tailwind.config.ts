import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F7FA',
        white: '#ffffff',
        red: '#FF6577',
        black: {
          100: '#F9F9F9',
          200: '#6B6B6B',
          300: '#5E5E5E',
          400: '#525252',
          500: '#454545',
          600: '#373737',
          700: '#2b2b2b',
          800: '#1F1F1F',
          900: '#121212',
          950: '#050505',
        },
        gray: {
          100: '#DEDEDE',
          200: '#C4C4C4',
          300: '#ABABAB',
          400: '#919191',
        },
        blue: {
          200: '#ECEFF4',
          300: '#CBD3E1',
          400: '#ABB8CE',
          500: '#8B9DBC',
          600: '#6A82A9',
          700: '#52698E',
          800: '#40516E',
          900: '#2D394E',
          950: '#1A212D',
        },
        line: {
          100: '#F2F2F2',
          200: '#CFDBEA',
        },
      },
      fontFamily: {
        point: ['Iropke', 'Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
