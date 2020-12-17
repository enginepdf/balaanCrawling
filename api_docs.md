# API docs


| Method   | End Point              | Request                                         | Response                                             | Usage                   |
| -------- | ------------------ | ----------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| Base URL | /                 |                                                 |                                                      |  |
| GET      | /items                  |                                                 | 크롤링 데이터 전송                                      |  |
| POST     | /signup       | body={email, password, phone} | * 성공 : status(201) <br/>* 실패 : status(409) | 회원가입 |
| POST      | /signin       | body={email, password} | * 성공 : status(200) <br/>* 실패 : status(404, 500) | 로그인 |
| GET      | /signout      |  | 루트 페이지로 리다이렉트 및 토큰 제거 | 로그아웃 |

