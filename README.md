# ChatGPT_Project

# 개요
   Chat GPT 연동 프로젝트
   제공된 서버 API를 이용한 간단한 날씨관련 활동 챗봇입니다.

# 이용한 개발 툴 및 외부 사이트
   Open AI와 OpenWeatherMap API를 이용하여 응답할 수 있도록 구현.
   html, css, JavaScript를 이용하여 User와 AI의 대화 화면을 구현했습니다.

# 개발환경
   visual studio code에서 HTML, CSS, JavaScript를 활용해 만들었습니다.

# 프로젝트 설명
   초기 구상<br>
   1. User와 AI간의 대화창 만들기<br>
   2. OpenWeatherMap을 통한 실시간 날씨 가져오기<br>
   3. 대화내용 함수로 구현하기<br>
   <br>
   추가한 내용<br>
   1. 앞으로 3일간의 날씨 알려주기(3시간 간격)<br>
   2. 로컬 스토리지에 저장하고 삭제하는 함수 구현<br>
   <br>
   함수구현<br>
   1. 큰 분류인 Sun, Clouds, Snow, Rain에 따른 행동양식 추천 함수.<br>
   2. User의 대화를 받는 함수 & AI가 응답하는 함수.<br>
   3. 실시간 대화를 하기 위한 메시지 추가&전송 함수.<br>
   4. 모든 대화 기록을 저장 및 삭제하는 함수.<br>
   5. 실시간 날씨 및 행동 추천 이후 3일간의 날씨 상황 예보하는 함수.<br>
   
# 추가할 내용
   1. 채팅 전체를 지우는 것뿐만 아닌 개별의 채팅에 대해서도 적용방법 강구<br>
   2. 날씨 그래프를 활용한 가독성 증진<br>
   <br>
   <br>
   <br>
   (예시)
   '안녕'이라는 대답이 들어 있을 시 인사로 응대하고
   '날씨'와 관련된 채팅이 들어오면 날씨 정보 조회한 후
   관련 내용을 전달해줍니다.
   ![첫이미지사진](https://github.com/mintcookie-park/ChatGPT_Project/assets/79849531/751c14a1-825c-4627-9ccc-f8c14e1830cc)
   ![날씨알려줘](https://github.com/mintcookie-park/ChatGPT_Project/assets/79849531/59647444-c27f-43fa-8c0e-3981a8e98cc0)
   ![날씨예보](https://github.com/mintcookie-park/ChatGPT_Project/assets/79849531/5a2908ca-2fa0-40c6-a050-14b66b267b64)
   ![삭제버튼](https://github.com/mintcookie-park/ChatGPT_Project/assets/79849531/24972857-daff-4d6d-b3f6-d9d70b9513bc)
