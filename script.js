const chatLog = document.getElementById('chat-log');
const questionInput = document.getElementById('questionInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', sendMessage);
questionInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

//local storage에서 채팅 기록 가져오기
window.addEventListener('load', () => {
  const savedChatHistory = localStorage.getItem('chatHistory');
    if (savedChatHistory) {
      chatLog.innerHTML = savedChatHistory;
  }
});

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}`;
  messageElement.innerText = message;
  const now = new Date();
  const timestamp = `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')} ${now.toLocaleTimeString()}`;

  // 메시지 내용과 시각 정보를 함께 표시
  messageElement.innerHTML = `<span class="message-content">${message}</span><br><span class="timestamp">${timestamp}</span>`;
  chatLog.appendChild(messageElement);

  console.log(`${sender}: ${message}`);

  chatLog.scrollTop = chatLog.scrollHeight;
  
  //local storage에 채팅 기록 남김
  localStorage.setItem('chatHistory', chatLog.innerHTML);
}

async function getAIResponse(question) {
  const prompt = question;
  const maxTokens = 50;

  try {
    const response = await Openai.Completions.create({
      engine: 'davinci-codex',
      prompt,
      max_tokens: maxTokens,
    });

    if (response.choices && response.choices.length > 0) {
      return response.choices[0].text.trim();
    } else {
      return 'AI 응답을 가져올 수 없습니다.';
    }
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'AI 응답을 가져올 수 없습니다.';
  }
}


async function getWeather(city) {
  const apiKey = '2236ec0e8876127f99e3896d9771926e';
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(endpoint);
  const data = await response.json();

  if (data.weather && data.weather.length > 0) {
    const weather = data.weather[0].main;
    const temperature = data.main.temp;
    return { weather, temperature };
  } else {
    console.error('Error fetching weather data:', data);
    return '날씨 정보를 가져올 수 없습니다.';
  }
}

function recommendActivity(weather) {
  switch (weather) {
    case 'Clear':
      return ['맑은 날씨에는 야외 산책을 추천해요!','바닷가에서 휴식하기도 좋아요.'];
    case 'Clouds':
      return ['흐린 날씨에는 도서관에서 책을 읽는 건 어떨까요?','실내에서 영화를 보는 것도 좋아요.'];
    case 'Rain':
      return ['비오는 날엔 영화를 보면 좋겠어요!','카페에서 따뜻한 음료와 함께 시간을 보내보세요.'];
    case 'Snow':
      return ['눈 오는 날에는 눈싸움을 해보는 건 어떨까요?','실내에서 따뜻한 차를 마시며 영화를 보는 것도 좋아요.'];
    default:
      return ['해당 지역의 날씨를 모릅니다. 날씨에 따른 활동 추천을 할 수 없어요.'];
  }
}


async function sendMessage() {
  const question = questionInput.value;
  if (!question) return;

  questionInput.value = '';

  appendMessage('user', question);

  const lowerCaseQuestion = question.toLowerCase();
  let aiResponse = '';

  if (lowerCaseQuestion.includes('안녕') || lowerCaseQuestion.includes('hi')) {
    aiResponse = '안녕하세요!어떤 도움이 필요하신가요?';
  } else if(lowerCaseQuestion.includes('좋은 하루')){
    aiResponse = '기분 좋으시다니 다행이네요';
  } else if(lowerCaseQuestion.includes('피곤')){
    aiResponse = '안타깝군요';
  } else if (lowerCaseQuestion.includes('날씨')) {
    const city = prompt('어떤 도시의 날씨 정보를 알고 싶으신가요? 영어로 입력해주세요.', 'Seoul');
    const { weather, temperature } = await getWeather(city);
    const recommendation = recommendActivity(weather);
    aiResponse = `지역: ${city}\n\n날씨: ${weather}\n온도: ${temperature}°C\n\n${recommendation.join('\n')}`;
  } else if(lowerCaseQuestion.includes('가볼게')){
    aiResponse = '서비스를 종료합니다.';
  } else {
    aiResponse = await getAIResponse(question);
  }

  appendMessage('AI', aiResponse);

  localStorage.setItem('chatHistory', chatLog.innerHTML);
}

window.addEventListener('load', () => {
  const savedChatHistory = localStorage.getItem('chatHistory');
  if (savedChatHistory) {
    chatLog.innerHTML = savedChatHistory;
  }
});
