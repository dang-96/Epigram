import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>Epigram</title>
        {/* 기본 메타태그 */}
        <meta
          name="description"
          content="감정상태에 따른 명언과 글귀들을 열람하고 공유하는 서비스"
        />
        <meta name="keywords" content="에피그램, epigram, EPIGRAM" />
        <meta name="author" content="epigram" />

        {/* 오픈 그래프 */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="EPIGRAM - 명언 공유 플랫폼" />
        <meta
          property="og:description"
          content="감정상태에 따른 명언과 글귀들을 열람하고 공유하는 서비스"
        />
        <meta property="og:image" content="/images/thumbnail.png" />
        <meta property="og:url" content="https://epigram-beryl.vercel.app/" />

        {/* 파비콘 */}
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
