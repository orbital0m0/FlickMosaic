import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-onboarding'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // GitHub Pages 배포를 위한 설정
  viteFinal: async (config) => {
    // production 환경에서만 베이스 경로 설정
    if (process.env.NODE_ENV === 'production') {
      config.base = '/watcha_clone_coding/';
    }
    return config;
  },
};
export default config;
