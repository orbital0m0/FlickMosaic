/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // 빌드 출력 디렉터리를 `./dist/`로 변경합니다.
  transpilePackages: ['@watcha/carousel'], // 트랜스파일링할 패키지 목록
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  }
}
 
export default nextConfig