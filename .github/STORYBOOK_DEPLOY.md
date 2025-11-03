# 📚 Storybook GitHub Pages 배포 가이드

이 문서는 Carousel 컴포넌트의 Storybook을 GitHub Pages에 배포하는 방법을 설명합니다.

## 🎯 배포 아키텍처

- **소스 코드**: `packages/carousel/src/stories/`
- **빌드 산출물**: `packages/carousel/storybook-static/`
- **배포 위치**: GitHub Pages (https://[username].github.io/[repository-name]/)
- **자동화**: GitHub Actions

## 📋 사전 준비 사항

### 1. GitHub Repository 설정 확인

현재 저장소 설정을 확인하세요:

- ✅ Public 저장소여야 함 (무료 GitHub Pages 사용 시)
- ✅ GitHub Actions가 활성화되어 있어야 함

## 🚀 배포 설정 단계

### Step 1: GitHub Pages 활성화

1. GitHub 저장소로 이동
2. **Settings** > **Pages** 메뉴로 이동
3. **Source** 설정:
   - "GitHub Actions"를 선택 (Build and deployment 섹션)

   > **중요**: "Deploy from a branch" 대신 **"GitHub Actions"**를 선택해야 합니다!

### Step 2: 워크플로우 파일 확인

`.github/workflows/deploy-storybook.yml` 파일이 생성되었습니다:

```yaml
# 주요 설정
- main 브랜치에 push 시 자동 배포
- packages/carousel 디렉토리 변경 시에만 실행
- 수동 실행(workflow_dispatch)도 지원
```

### Step 3: 배포 실행

#### 자동 배포 (권장)

1. `packages/carousel` 폴더의 파일을 수정
2. 변경사항을 커밋
3. `main` 브랜치에 push 또는 PR 머지

```bash
git add .
git commit -m "feat: Update Carousel component"
git push origin main
```

4. GitHub Actions 탭에서 배포 진행 상황 확인
5. 완료 후 URL로 접속: `https://[username].github.io/[repository-name]/`

#### 수동 배포

1. GitHub 저장소의 **Actions** 탭으로 이동
2. **Deploy Storybook to GitHub Pages** 워크플로우 선택
3. **Run workflow** 버튼 클릭
4. 브랜치 선택 후 **Run workflow** 실행

### Step 4: 로컬에서 빌드 테스트

배포 전 로컬에서 빌드를 테스트할 수 있습니다:

```bash
# 프로젝트 루트에서
pnpm --filter @orbital0m0/carousel build-storybook

# 빌드 결과 확인
cd packages/carousel/storybook-static
npx serve .
```

브라우저에서 `http://localhost:3000`으로 접속하여 확인하세요.

## 🔍 배포 프로세스 상세

### 1. 빌드 단계 (Build Job)

```yaml
- 저장소 체크아웃
- Node.js 및 pnpm 설정
- 의존성 설치 (캐시 활용)
- Storybook 빌드
- .nojekyll 파일 생성 (Jekyll 처리 방지)
- 빌드 산출물 업로드
```

### 2. 배포 단계 (Deploy Job)

```yaml
- GitHub Pages 환경 설정
- 빌드 산출물을 GitHub Pages에 배포
- 배포 URL 출력
```

## 🌐 배포 URL 확인

배포가 완료되면 다음 위치에서 URL을 확인할 수 있습니다:

1. **GitHub Actions 탭**:
   - 워크플로우 실행 결과에서 "Deploy to GitHub Pages" 스텝 확인
   - `page_url` 출력 확인

2. **Settings > Pages**:
   - "Your site is live at" 메시지 확인

3. **일반적인 URL 형식**:
   - `https://[username].github.io/[repository-name]/`
   - 예: `https://orbital0m0.github.io/watcha_clone_coding/`

## 🛠️ 트러블슈팅

### 문제 1: 404 에러 발생

**원인**: GitHub Pages 설정이 잘못됨

**해결 방법**:

1. Settings > Pages에서 Source가 "GitHub Actions"로 설정되어 있는지 확인
2. 워크플로우가 성공적으로 완료되었는지 확인
3. 브라우저 캐시 삭제 후 재시도

### 문제 2: CSS/JS 파일이 로드되지 않음

**원인**: 베이스 경로 설정 문제

**해결 방법**:
`.storybook/main.ts`에 베이스 경로 추가:

```typescript
const config: StorybookConfig = {
  // ... 기존 설정
  viteFinal: async (config) => {
    if (process.env.NODE_ENV === "production") {
      config.base = "/watcha_clone_coding/"; // 저장소 이름으로 변경
    }
    return config;
  },
};
```

### 문제 3: 워크플로우 권한 에러

**원인**: GitHub Pages 배포 권한 부족

**해결 방법**:

1. Settings > Actions > General로 이동
2. "Workflow permissions" 섹션에서
3. "Read and write permissions" 선택
4. "Allow GitHub Actions to create and approve pull requests" 체크

### 문제 4: 빌드 실패

**원인**: 의존성 또는 빌드 오류

**해결 방법**:

```bash
# 로컬에서 빌드 테스트
pnpm install
pnpm --filter @orbital0m0/carousel build-storybook

# 에러 메시지 확인 및 수정
```

## 📊 배포 최적화 팁

### 1. 조건부 배포

특정 경로의 변경사항만 배포하도록 설정됨:

```yaml
on:
  push:
    paths:
      - "packages/carousel/**"
      - ".github/workflows/deploy-storybook.yml"
```

### 2. 캐시 활용

pnpm store를 캐싱하여 빌드 속도 향상:

- 첫 빌드: ~3-5분
- 캐시 사용 시: ~1-2분

### 3. 동시 배포 방지

```yaml
concurrency:
  group: "pages"
  cancel-in-progress: true
```

여러 배포가 동시에 실행되지 않도록 설정됨.

## 📝 유지보수

### 정기 점검 사항

1. **월 1회**: GitHub Actions 워크플로우 실행 로그 확인
2. **분기 1회**: 의존성 업데이트 확인
3. **배포 후**: 실제 배포된 사이트에서 모든 스토리 동작 확인

### 배포 기록 관리

GitHub Actions 탭에서 배포 기록을 확인할 수 있습니다:

- 배포 시간
- 커밋 정보
- 빌드 로그
- 성공/실패 상태

## 🔗 관련 문서

- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [Storybook 배포 가이드](https://storybook.js.org/docs/react/sharing/publish-storybook)

## 💡 추가 기능

### 커스텀 도메인 설정

1. 도메인 구매 및 DNS 설정
2. Settings > Pages > Custom domain에 도메인 입력
3. `packages/carousel/storybook-static/CNAME` 파일 생성:

```
storybook.yourdomain.com
```

### 배포 알림 설정

Slack이나 Discord로 배포 알림을 받을 수 있습니다:

```yaml
- name: Notify deployment
  if: success()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## 🎉 완료!

이제 Storybook이 자동으로 배포됩니다.
`main` 브랜치에 변경사항을 push할 때마다 자동으로 업데이트됩니다!
