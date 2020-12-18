## 프로젝트명
- **Balaan Crawling**


## 기술 스택

### Front-end
- React.js : 처음부터 모든 것을 구현하지는 않았음. 기존에 가지고 있던 코드를 일부 변경.

### Back-end
- Node.js : compression, helmet 라이브러리를 사용함.
- Express.js : node.js와 함께 사용.
- JWT : 로그인 기능 구현을 위함.
- MySQL : EC2에서 RDS(Mysql)로 연결 후 Sequelize 이용.
- Sequelize : config.js 이용, development와 production 모드로 구분해서 작동.
- Nightmare : local에서는 정상 작동하지만, remote linux 환경에서 screen 등의 문제로 작동하지 않아서 
  로컬 /server에 db.txt에 데이터 저장 후 배포.

### Deployment
- AWS(EC2 / RDS / S3) : EC2에서 RDS로 연결(server 및 mysql). S3에 client 배포. 

### 배포되지는 않았지만 개발 시도에 사용한 것(main branch에서 코드 확인 가능)
- Nginx : 외부 접속 포트 3060에서 nginx의 80 포트로 연결 후 client(포트 3000), api(포트 3050)로 요청 전달하도록 설계.
  (client를 포함하는 코드는 feature branch에서 확인)
- Docker : Docker-Compose 이용 시 내부 service container들 간에 네트워크 연결이 디폴트로 된다는 점을 이용. 
  development 환경에서 mysql service에 빌드 시 바로 연결되지 않음.(.sh 이용해서 timeout을 주라는 해결책이 있다고 함)
- Travis(CI/CD) - Docker 아이디와 패스워드 등을 환경 변수로 처리. main 브랜치에 commit이 있을 때마다 작동.
  빌드 후, AWS Elastic Beanstalk에 배포하도록 설정.
- AWS Elastic Beanstalk - 데이터베이스 호스트, 비밀번호, 유저 이름 등을 환경변수로 처리해서 코드에 보이지 않게 처리.(보안)
  travis에서 빌드 성공했지만 Beanstalk 배포에는 실패.
- Heroku - client(Branch : final) 배포는 했지만 https를 사용하고 있어서 EC2로의 http 연결이 안 됨.
  (SSL 인증서 혹은 nginx 이용이 필요하다고 함)


## 스크린샷

<img width="1670" alt="Screen Shot 2020-12-17 at 12 17 58 PM" src="https://user-images.githubusercontent.com/62423408/102441141-0bdf7300-4065-11eb-9a8c-f677afb42de1.png">
<img width="1651" alt="Screen Shot 2020-12-17 at 12 17 55 PM" src="https://user-images.githubusercontent.com/62423408/102441148-0eda6380-4065-11eb-83ea-ece74786cf85.png">
<img width="408" alt="Screen Shot 2020-12-17 at 2 17 29 PM" src="https://user-images.githubusercontent.com/62423408/102447265-0721bb80-4073-11eb-9763-44c4a4a3acbc.png">


## 주요 기능 안내

1. 회원가입
2. 로그인 / 로그아웃
3. Balaan 웹사이트로부터 Nightmare.js, Cheerio 이용해 상품 데이터 크롤링       
   (페이지, 카테고리별 크롤링 가능)
4. 크롤링한 데이터를 '/'에서 grid 형식으로 보여줌
5. AWS(S3, EC2, RDS) 이용한 배포 및 관리


## 설치 & 사용 방법(Local Development)
### /server(Branch : main), /client(Branch : final)
1. npm install

### /server
1. export DATABASE_PASSWORD='(mysql 루트 비밀번호)'
2. export SECRET_KEY='(jwt 사용을 위한 salt)'
3. npx sequelize-cli db:migrate
4. node scrapingItems.js
5. node app.js

### /client(Branch : feature, final)
1. npm start
2. docker-compose up --build(Branch : feature) : localhost:3060으로 client container 접근(api, mysql, client container에 에러 존재)





