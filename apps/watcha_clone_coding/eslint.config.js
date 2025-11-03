import watchaConfig from '@watcha/eslint-config';

export default [
  // 전역 ignore는 별도 객체로 분리
  {
    ignores: ['dist/**', 'node_modules/**', '.next/**', 'next-env.d.ts'],
  },
  ...watchaConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        React: 'readonly',
      },
    },
    settings: {
      react: {
        version: '19.1.1',
      },
    },
  },
  {
    files: ['webpack*.js'], //webpack 관련 모든 JavaScript 파일
    languageOptions: {
      globals: { //전역 변수들을 readonly로 선언하여 ESLint가 "정의되지 않은 변수" 오류를 발생시키지 않도록 함
        require: 'readonly', //CommonJS 모듈 시스템의 require 함수
        module: 'readonly', //현재 모듈 정보를 담고 있는 객체
        process: 'readonly', //Node.js 프로세스 정보를 담고 있는 객체
        __dirname: 'readonly', //현재 모듈의 경로
        console: 'readonly', //콘솔 객체
      },
    },
  },
  {
    rules: {
      'react/prop-types': 'off', //TypeScript를 사용하므로 PropTypes 대신 TypeScript의 타입 시스템을 활용
      'react/display-name': 'off', //React 컴포넌트의 displayName 속성을 비활성화
    },
  },
];