# 🚀 GitHub Pages 배포 - 빠른 시작 가이드

Storybook을 GitHub Pages에 배포하기 위한 단계별 가이드입니다.

## ✅ 체크리스트

배포하기 전에 다음 사항들을 확인하세요:

- [ ] GitHub 저장소가 Public인지 확인 (무료 GitHub Pages 사용 시)
- [ ] `.github/workflows/deploy-storybook.yml` 파일이 생성되었는지 확인
- [ ] `packages/carousel/.storybook/main.ts`에 베이스 경로가 설정되었는지 확인

## 📋 5단계로 끝내는 배포 설정

### 1단계: GitHub Pages 활성화

1. GitHub 저장소로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - ❌ "Deploy from a branch" 선택하지 말 것
   - ✅ **"GitHub Actions"** 선택

![GitHub Pages Settings](https://docs.github.com/assets/cb-47267/mw-1440/images/help/pages/publishing-source-drop-down.webp)

### 2단계: 워크플로우 권한 설정

1. **Settings** > **Actions** > **General**로 이동
2. 페이지 하단 **Workflow permissions** 섹션 찾기
3. 다음 옵션 선택:
   - ✅ "Read and write permissions"
   - ✅ "Allow GitHub Actions to create and approve pull requests" 체크

### 3단계: main 브랜치에 푸시

```bash
# 변경사항 확인
git status

# 모든 변경사항 스테이징
git add .

# 커밋
git commit -m "feat: Add GitHub Pages deployment for Storybook"

# main 브랜치에 푸시
git push origin main
```

### 4단계: 배포 확인

1. GitHub 저장소의 **Actions** 탭으로 이동
2. "Deploy Storybook to GitHub Pages" 워크플로우 실행 확인
3. 녹색 체크 마크가 뜨면 성공! ✅

### 5단계: 배포된 사이트 접속

배포 완료 후 다음 URL로 접속:

```
https://[GitHub사용자명].github.io/watcha_clone_coding/
```

예시:

- `https://orbital0m0.github.io/watcha_clone_coding/`

> 💡 **팁**: Actions 탭의 워크플로우 상세 페이지에서 정확한 URL을 확인할 수 있습니다.

## 🔧 로컬에서 테스트

배포 전에 로컬에서 빌드를 테스트해보세요:

```bash
# Storybook 빌드
pnpm --filter @orbital0m0/carousel build-storybook

# 로컬 서버로 확인
cd packages/carousel/storybook-static
npx serve .
# 또는
python -m http.server 8000
```

브라우저에서 `http://localhost:3000` (또는 8000) 접속

## 🔄 지속적인 배포

이제 설정이 완료되었습니다!

**앞으로 자동으로 배포됩니다:**

- `packages/carousel/` 폴더의 파일을 수정
- `main` 브랜치에 push 또는 PR 머지
- GitHub Actions가 자동으로 빌드 및 배포

## 🐛 문제 해결

### "페이지가 표시되지 않아요!"

1. **Settings > Pages**에서 Source가 "GitHub Actions"인지 확인
2. Actions 탭에서 워크플로우가 성공했는지 확인
3. 브라우저 캐시 삭제 (Ctrl + Shift + R)
4. 5-10분 정도 기다린 후 재시도

### "CSS/JS가 로드되지 않아요!"

`.storybook/main.ts`의 베이스 경로가 올바른지 확인:

```typescript
viteFinal: async (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.base = '/watcha_clone_coding/'; // 저장소 이름과 일치해야 함
  }
  return config;
},
```

### "워크플로우가 실패했어요!"

1. Actions 탭에서 실패한 워크플로우 클릭
2. 에러 로그 확인
3. 로컬에서 `pnpm install` 및 `pnpm build-storybook` 실행하여 빌드 테스트

## 📚 상세 문서

더 자세한 내용은 다음 문서를 참고하세요:

- [STORYBOOK_DEPLOY.md](./STORYBOOK_DEPLOY.md)

## 🎉 완료!

이제 Storybook이 자동으로 배포됩니다!

배포된 URL을 팀원들과 공유하세요:

```
https://[사용자명].github.io/watcha_clone_coding/
```

---

**문제가 있나요?** 이슈를 등록해주세요!
