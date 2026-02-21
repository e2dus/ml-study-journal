<<<<<<< HEAD
# 🧠 ML Study Journal

머신러닝을 공부하며 배운 내용을 정리하는 개인 학습 저널 웹사이트입니다.

## 🎨 주요 기능

- **학습 주제** — 지도학습, 비지도학습, 딥러닝, 전처리, 평가, NLP
- **학습 노트** — 공부한 내용과 실습 코드 정리
- **도구 & 스킬** — 사용하는 라이브러리와 프레임워크
- **학습 여정** — 타임라인 형태의 학습 기록
- **반응형 디자인** — 모바일/태블릿/데스크톱 지원
- **다크 테마** — 눈에 편한 다크 모드 UI

## 🚀 GitHub Pages 배포 방법

### 1단계: GitHub 리포지토리 만들기

1. [GitHub](https://github.com)에 로그인하세요
2. 우측 상단 `+` 버튼 → **New repository** 클릭
3. Repository name에 `username.github.io` 또는 `ml-study-journal` 입력
4. **Public** 선택 후 **Create repository** 클릭

### 2단계: 파일 업로드

**방법 A — GitHub 웹에서 직접 업로드:**
1. 리포지토리 페이지에서 **"uploading an existing file"** 클릭
2. 모든 파일(`index.html`, `style.css`, `script.js`)을 드래그 앤 드롭
3. `Commit changes` 클릭

**방법 B — Git 명령어 사용:**
```bash
git init
git add .
git commit -m "초기 커밋: ML Study Journal"
git branch -M main
git remote add origin https://github.com/username/ml-study-journal.git
git push -u origin main
```

### 3단계: GitHub Pages 활성화

1. 리포지토리 → **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source** → `Deploy from a branch` 선택
4. **Branch** → `main`, 폴더 → `/ (root)` 선택
5. **Save** 클릭

### 4단계: 웹사이트 확인

몇 분 후 아래 주소에서 웹사이트를 확인할 수 있습니다:
```
https://username.github.io/ml-study-journal/
```

---

## 📝 내용 수정 방법

### 나의 정보 수정 (`index.html`)

- **GitHub 프로필** — `github-link` 의 `href` 수정
- **Kaggle 프로필** — `kaggle-link` 의 `href` 수정
- **이메일** — `your@email.com` 부분 수정

### 학습 노트 추가

`notes-grid` 안에 새 카드를 추가하세요:
```html
<a href="링크" class="note-card reveal">
  <div class="note-meta">
    <span class="note-category tag tag-blue">카테고리</span>
    <span class="note-date">날짜</span>
  </div>
  <div class="note-title">제목</div>
  <div class="note-excerpt">요약 내용</div>
  <div class="note-footer">
    <span class="note-read-time">⏱ n분 읽기</span>
    <div class="note-arrow">→</div>
  </div>
</a>
```

### 학습 주제 진도율 변경

`data-width` 값을 원하는 퍼센트로 변경하세요:
```html
<div class="topic-progress-fill" data-width="75%"></div>
```

## 🛠 기술 스택

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Inter, Fira Code)
- GitHub Pages (무료 호스팅)

## 📄 라이선스

MIT License — 자유롭게 사용하고 수정하세요!
=======
# ml-study-journal
>>>>>>> fc914c68b3b581ea91db5196d97fc6df119b4fd8
