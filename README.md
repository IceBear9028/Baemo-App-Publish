# BAEMO (배드민턴의 모든 것)
![readme_mockup2](https://raw.githubusercontent.com/HeadOff-TIL/headoffti-content/baemo/baemo-introduce.png)
> **BAEMO(배드민턴의 모든것)** 는 배드민턴을 좋아하는 사람들끼리 모여 오프라인 운동, 모임을 주선하고, 배드민턴과 관련된 정보들을 공유하는 커뮤니티 서비스 입니다.

---

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [주요 기능](#주요-기능)
3. [기술 스택](#기술-스택)
4. [실행 방법](#실행방법)
   - [debugmode 실행 방법](#debugmode-실행-방법)
   - [APK 파일 추출 방법(Android)](#apk-파일-추출-방법-android-only)

---

## 프로젝트 소개

> **BAEMO**는 배드민턴 애호가들을 연결하기 위한 커뮤니티 기반 애플리케이션입니다.

- 배드민턴 모임을 생성하고 참가자들과 소통 및 게임 공유
- 지역별 배드민턴 코트 정보 및 리뷰 공유
- 배드민턴 기술과 전략 관련 게시글 작성 및 댓글 토론
- 장비 리뷰 및 추천 정보 제공

---

## 주요 기능

- **모임 주선**: 배드민턴 모임 생성 및 관리.
- **운동 주선**: 지역과 시간대에 맞는 배드민턴 모임 생성 및 관리.
- **코트 정보 제공**: 배드민턴 코트 위치, 예약 정보, 사용자 리뷰 등 확인.
- **커뮤니티 게시판**: 다양한 배드민턴 관련 주제를 논의할 수 있는 게시판.
- **알림 서비스**: 모임 일정, 게시판 활동 등의 실시간 알림 제공.

---

## 기술 스택
- 프레임워크 : `React-Native`  
- 상태관리 : `React Query`, `Zustand`  
- Style : `Styled-Component`


---
## 실행방법

### DebugMode 실행 방법

1. Metro 서버 실행
   ```bash
   npm start
   ```

2. 프로젝트 실행
   ### Start IOS
   ```bash
   # 1. 배포 버전 실행
   npm run ios
    
   # 2. 개발 버전 실행
   npm run ios-dev
   ```
   ### Start Android
   ```bash
   # 1. 배포 버전 실행
   npm run android
    
   # 2. 개발 버전 실행
   npm run android-dev
   ```

### APK 파일 추출 방법 (Android Only)
1. apk 추출 명령어 실행
   ```bash
   # 1. 배포 버전 APK 파일 추출
   npm run android-prod-apk
    
   # 2. 개발 버전 실행
   npm run android-dev-apk
   ```

2. 명령어 실행 후 해당 위치로 들어가서 apk 파일 확인
   ```bach
   ~/android/app/build/outputs/apk/release
   ```

