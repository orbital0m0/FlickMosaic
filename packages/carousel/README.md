# 🎠 @orbital0m0/carousel

React 기반의 재사용 가능한 Carousel 컴포넌트 라이브러리입니다.

## 📚 Storybook

컴포넌트의 사용 예시와 문서는 Storybook에서 확인할 수 있습니다.

- **배포된 Storybook**: [https://f-lab-edu.github.io/watcha_clone_coding/](https://f-lab-edu.github.io/watcha_clone_coding/)

### 로컬에서 Storybook 실행

```bash
# 개발 서버 실행
pnpm storybook

# 빌드
pnpm build-storybook
```

## 🚀 설치

```bash
pnpm add @orbital0m0/carousel
```

## 💡 사용 방법

```tsx
import { Carousel } from '@orbital0m0/carousel';
import '@orbital0m0/carousel/styles';

function App() {
  return (
    <Carousel.Root>
      <Carousel.Item>{/* 내용 */}</Carousel.Item>
    </Carousel.Root>
  );
}
```

## 📦 개발

```bash
# 의존성 설치
pnpm install

# 타입 체크
pnpm type-check

# 린트
pnpm lint

# 빌드
pnpm build
```

## 📖 문서

- [Storybook 배포 가이드](../../.github/STORYBOOK_DEPLOY.md)
- [GitHub Pages 빠른 시작](../../.github/GITHUB_PAGES_SETUP.md)

## 📄 라이센스

ISC
