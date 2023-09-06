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
   ### 초기 구상
      1. User와 AI간의 대화창 만들기
      2. OpenWeatherMap을 통한 실시간 날씨 가져오기
      3. 대화내용 함수로 구현하기
      
   ### 추가한 내용
      1. 앞으로 3일간의 날씨 알려주기(3시간 간격)
      2. 로컬 스토리지에 저장하고 삭제하는 함수 구현
      
   ### 함수 구현
      1. 큰 분류인 Sun, Clouds, Snow, Rain에 따른 행동양식 추천 함수.
      2. User의 대화를 받는 함수 & AI가 응답하는 함수.
      3. 실시간 대화를 하기 위한 메시지 추가&전송 함수.
      4. 모든 대화 기록을 저장 및 삭제하는 함수.
      5. 실시간 날씨 및 행동 추천 이후 3일간의 날씨 상황 예보하는 함수.
     
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
   ![첫이미지사진](https://github.com/mintcookie-park/ChatGPT_Project/assets/79849531/bd8beb58-243c-493e-9888-ba87437c48d7)


   ![날씨알려줘](https://github.com/mintcookie-park/ChatGPT_Project/assets/79849531/4762fc49-90a1-4315-a0c5-c93a49d40dfd)

   ![날씨알려줘](https://github.com/mintcookie-park/ChatGPT_Project/assets/79849531/7768bba4-dab3-46f7-8b46-d8f542a6755e)

   ![삭제버튼](https://github.com/mintcookie-park/ChatGPT_Project/assets/79849531/81e4a1ea-7061-4ab1-a663-1620d6eec2e4)
