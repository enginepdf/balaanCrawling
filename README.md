## 개요
- 프로젝트 명 : **Balaan Crawling**

## 기술 스택

### Front-end
- React.js

### Back-end
- Node.js
- Express.js
- JWT
- MySQL
- Sequelize
- Nightmare

### Etc.
- AWS(EC2 / RDS / S3)

### 배포되지는 않았지만 개발 시도에 사용한 것(main branch에서 코드 확인 가능)
- Nginx : 외부 접속 포트 3060에서 nginx의 80 포트로 연결 후 client(포트 3000), api(포트 3050)로 요청 전달하도록 설계.
- Docker : Docker-Compose 이용 시 내부 service container들 간에 네트워크 연결이 디폴트로 된다는 점을 이용. 
  development 환경에서 mysql service에 빌드 시 바로 연결되지 않음.(.sh 이용해서 timeout을 주라는 해결책이 있다고 함)
- travis(CI/CD) - Docker 아이디와 패스워드 등을 환경 변수로 처리. main 브랜치에 commit이 있을 때마다 작동.
  빌드 후, AWS Elastic Beanstalk에 배포하도록 설정.
- AWS Elastic Beanstalk - 데이터베이스 호스트, 비밀번호, 유저 이름 등을 환경변수로 처리해서 코드에서 보이지 않게 처리.(보안)
  travis에서 빌드 성공했지만 Beanstalk 배포에는 실패

## 스크릿샷

<img width="1670" alt="Screen Shot 2020-12-17 at 12 17 58 PM" src="https://user-images.githubusercontent.com/62423408/102441141-0bdf7300-4065-11eb-9a8c-f677afb42de1.png">
<img width="1651" alt="Screen Shot 2020-12-17 at 12 17 55 PM" src="https://user-images.githubusercontent.com/62423408/102441148-0eda6380-4065-11eb-83ea-ece74786cf85.png">

## 주요 기능 안내

1. 회원가입
2. 로그인 / 로그아웃
3. Balaan 웹사이트로부터 Nightmare.js, Cheerio 이용해 상품 데이터 크롤링       
   (페이지, 카테고리별 크롤링 가능)
4. 크롤링한 데이터를 '/items'에서 grid 형식으로 보여줌
5. AWS(S3, EC2, RDS) 이용한 배포 및 관리

## 설치 & 사용 방법(local development)
### /server(Branch: main)
1. npm install

### /server/scraping
1. node scrapingItems.js

### /server
1. export DATABASE_PASSWORD='(mysql 루트 비밀번호)'
2. export SECRET_KEY='(jwt 사용을 위한 salt)'
3. npx sequelize-cli db:migrate
4. node app.js

### /client(Branch : feature, final)
1. npm start





