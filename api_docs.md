# API docs


| Method   | End Point              | Request                                         | Response                                             | Usage                   |
| -------- | ------------------ | ----------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| Base URL | /                 |                                                 |                                                      |  |
| GET      | /items                  |                                                 | 크롤링 데이터 전송                                      |  |
| POST     | /signup       | body={email, password, phone} | * 성공 : status(201) <br/>* 실패 : status(409) - 가입된 이메일 존재 | 회원가입 |
| POST      | /signin       | body={email, password} | * 성공 : status(200) <br/>* 실패 : status(404) - 이메일 혹은 패스워드 오류 <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;status(500) - jwt 관련 오류 | 로그인 |
| GET      | /signout      |  | * 성공 : 루트 페이지로 리다이렉트 및 토큰 제거 <br/> * 실패 : status(401) - 로그인 안 되어 있음 | 로그아웃 |

