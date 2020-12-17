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

## 스크릿샷

## 주요 기능 안내

1. 회원가입
2. 로그인/ 로그아웃
3. Balaan 웹사이트로부터 Nightmare.js, Cheerio 이용해 상품 데이터 크롤링       
   (페이지, 카테고리별 크롤링 가능)
4. 크롤링한 데이터를 '/'에서 grid 형식으로 보여줌
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





