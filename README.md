# 뿅뿅 단어장
### <a href="https://ppvoca.vercel.app/book/list" >🖥️ Website</a>
엘리스 2차 스터디 (FE 파트) <br />
🐱 깃허브
https://github.com/elicestudy
<img width="1313" alt="voca3" src="https://github.com/ji-silver/Player/assets/59919953/7529ac11-86d5-4fa1-8aaf-aad266639b56">

## 🗒️ 프로젝트 기획

**나만의 단어장을 만들어 단어를 학습하고 퀴즈를 풀며 단어를 복습할 수 있는 앱 기반 뿅뿅 단어장** <br />
다음 사전 크롤링을 통해 정확하고 신뢰성 있는 단어 학습을 지원하는 앱 기반 한/영 단어장입니다.
- 앱 어플리케이션 <****VoCat - 나만의 단어장****>을 클론코딩한 앱 기반 웹 서비스
- 기본적인 CRUD기능 + 퀴즈 기능으로 다양한 로직을 구현해 볼 수 있는 매체
- 전 인원 풀스택 개발 진행

## 👩‍👩‍👧‍👦 멤버 구성 (기여도)
FE 3명, BE 3명 (FE & BE 기여도 20%)

## 📅 개발 기간
2023/05/08 ~ 2023/05/26

## ⚒️ 기술 스택
****Front-End**** <br/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white" />
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
<br /><br />
****Back-End**** <br/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />

## 📌 담당 기능
### 1. 단어장 추가 / 수정

|단어장 추가 / 수정|설명|
|------|---|
|<img src="https://github.com/ji-silver/Player/assets/59919953/a40200ec-9606-4269-a1c2-c9740948b479" width="auto" height="450"/>|- 단어장 추가 페이지와 수정페이지를 조건에 따라 다른 UI와 동작을 조건부로 렌더링하고 상태를 관리합니다. <br/>- axios로 API 통신을 통해 단어장을 추가하거나 수정할 수 있도록 구현하였습니다. <br/> - 재사용 가능한 컴포넌트를 사용하여 코드의 모듈화와 유지보수성을 높였습니다. <br/> - useState, useRef와 같은 훅을 활용하여 컴포넌트 내에서 상태를 관리하고, 상태 업데이트를 처리합니다.|


### 2. 단어 추가 / 수정
|단어 추가 / 수정|설명|
|------|---|
|<img src="https://github.com/ji-silver/Player/assets/59919953/86de07a2-f6ed-419d-bd90-3a61e7e07fcc" width="auto" height="450"/>| - 단어 추가 페이지와 단어 수정 페이지의 분기처리로 조건부 렌더링을 구현했습니다. <br /> - axios로 API 통신을 통해 단어장 리스트와 단어 데이터를 가져오는 로직을 구현하였습니다. <br /> - 단어 입력 후 백엔드에 API 요청을 보내면 크롤링한 의미 데이터를 받아와 화면에 표시하고,<br /> 의미를 수정하거나 삭제할 수 있습니다. <br /> - 단어장 선택을 위해 부모 컴포넌트에서 자식 컴포넌트로 단어장 정보를 props로 전달하고, <br/>자식 컴포넌트에서 부모 컴포넌트의 상태를 업데이트하는 방식을 활용했습니다.|
