# 반납하세요

도서관 관리 웹 애플리케이션입니다.

## 시스템 소개

**반납하세요**는 사용자 맞춤형 도서 관리 시스템입니다. 도서 등록, 검색, 대여/반납을 간편하게 처리할 수 있으며, 사용자 친화적인 인터페이스를 제공합니다.

## 주요 기능

- **도서 관리**: 도서 추가, 삭제
- **대여/반납**: 도서 대여 및 반납 기능, 반납 예정일 자동 계산 (7일)
- **검색 필터**: 도서 제목, 저자, 카테고리별 검색
- **상태 필터**: 전체 / 대여가능 / 대여중 필터링
- **통계 대시보드**: 전체 도서 수, 대여가능 도서 수, 대여중 도서 수 표시
- **반응형 디자인**: 다양한 화면 크기에 최적화

## 기술 스택

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 5.2.8
- **Styling**: CSS3 (Custom Properties)
- **Package Manager**: npm

## 설치 및 실행

### 요구사항
- Node.js 18.x 이상
- npm 8.x 이상

### 로컬 개발 환경

```bash
# 1. 저장소 클론
git clone <repository-url>
cd aws_s3

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속합니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## GitHub Actions - CI/CD 구축

### 워크플로우 개요

메인 브랜치에 푸시될 때마다 자동으로 다음 프로세스가 실행됩니다:

1. **코드 체크아웃**: GitHub 저장소에서 최신 코드 가져오기
2. **환경 설정**: Node.js 18 버전 설정 및 npm 캐시 활성화
3. **의존성 설치**: `npm install` 실행
4. **빌드**: `npm run build` 실행 → `dist/` 폴더 생성
5. **AWS 인증**: 액세스 키 및 세션 토큰 설정
6. **S3 배포**: 빌드 결과물을 AWS S3 버킷에 자동 배포

### GitHub Secrets 설정 (필수)

GitHub 저장소 Settings → Secrets and variables → Actions에서 다음 값을 추가합니다:

| Secret Name | 설명 |
|-------------|------|
| `AWS_ACCESS_KEY_ID` | AWS IAM 액세스 키 ID |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM 시크릿 액세스 키 |
| `AWS_SESSION_TOKEN` | Academy Learner Lab 세션 토큰 |

### 워크플로우 파일

```
.github/workflows/build.yml
```

워크플로우는 `main` 브랜치에 `push` 이벤트 발생 시 자동 트리거됩니다.

## 🌐 AWS S3 배포 URL

**배포된 애플리케이션 URL**: `https://react-s3-20263619.s3.us-east-1.amazonaws.com/index.html`

*실제 URL은 S3 버킷 정적 웹사이트 호스팅 설정 후 확인 가능합니다.*

### S3 정적 웹사이트 호스팅 설정 방법

1. AWS S3 콘솔 접속
2. 버킷 선택 → Properties 탭
3. Static website hosting 섹션 → Edit
4. Enable static website hosting 체크
5. Index document: `index.html`
6. Permissions 탭에서 Bucket Policy 설정

## 🎬 CI/CD 구축 시연 영상

GitHub Actions를 활용한 자동 배포 파이프라인 구축 과정:

**[YouTube 링크](https://youtu.be/bH8Hf7MJ8Ys)**

## 📋 프로젝트 구조

```
aws_s3/
├── .github/
│   └── workflows/
│       └── build.yml              # GitHub Actions 워크플로우
├── src/
│   ├── App.jsx                    # 메인 애플리케이션 컴포넌트
│   ├── main.jsx                   # 애플리케이션 진입점
│   └── styles.css                 # 전역 스타일
├── index.html                     # HTML 템플릿
├── package.json                   # 프로젝트 메타데이터 및 의존성
├── vite.config.js                 # Vite 설정 파일
└── README.md                      # 프로젝트 문서
```


## 📝 라이선스

이 프로젝트는 학습용 프로젝트입니다.
