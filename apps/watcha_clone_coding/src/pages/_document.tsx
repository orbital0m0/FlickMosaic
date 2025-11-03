import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta name="description" content="WATCHA Clone Coding - 영화 추천 서비스" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://api.themoviedb.org" />
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://api.themoviedb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
