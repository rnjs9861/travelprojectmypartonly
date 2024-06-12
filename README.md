# 6.09

- plan 페이지 입력 정보 post 성공

- calendar 페이지 plan에서 입력한 정보 get 성공, events post 성공

- allSchedule 페이지 plan에서 입력한 모든 정보 get 성공, events post 성공

- events get도 성공

# 6.10

- postman 자체 DB로 수정 작동 확인
- 계획 수정하기 및 삭제하기 만듦
- 마이페이지 만듦- 다만 로그인 기능 미구현으로 테스트 불가

# 6.12

- 아이디, 비밀번호, 이메일 정규표현식 성공

- user 테이블에서 만든 uid가 계획 페이지의 tour 테이블로 가는 것 확인. 다만 user테이블의 pk가 넘어가진 않음.

- tour테이블의 pk인 tour_id 가 tour_schedule(세부일정) 테이블로 가는건 확인.

- tour_schedule에 date 따로 뺌

# 남은 할 일

- 로그인 후 Swagger로 테스트, 수정, 삭제 기능

- 메인 페이지에서 계획 누를시 /plan/:id 페이지로 이동
  "proxy": "http://192.168.0.53:8080"
