const chatLog = document.getElementById('chat-log');
const questionInput = document.getElementById('questionInput');
const sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', sendMessage);
// API 키 설정
const weatherApiKey = '2236ec0e8876127f99e3896d9771926e';

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

// 날씨 조건에 따른 활동 추천
function recommendActivity(weatherConditions) {
  const recommendations = [];

  if (weatherConditions.includes('Clear')) {
    recommendations.push('맑은 날씨에는 야외 산책을 추천해요!', '놀이공원이나 야외로 놀러가거나 휴식하기도 좋아요.');
  }

  if (weatherConditions.includes('Clouds')) {
    recommendations.push('흐린 날씨에는 도서관에서 책을 읽는 건 어떨까요?', '실내에서 영화를 보는 것도 좋아요.');
  }

  if (weatherConditions.includes('Rain')) {
    recommendations.push('비오는 날엔 영화를 보면 좋겠어요!', '카페에서 따뜻한 음료와 함께 시간을 보내보세요.');
  }

  if (weatherConditions.includes('Snow')) {
    recommendations.push('눈 오는 날에는 눈싸움을 해보는 건 어떨까요?', '실내에서 따뜻한 차를 마시며 영화를 보는 것도 좋아요.');
  }

  if (recommendations.length === 0) {
    recommendations.push('해당 지역의 날씨에 대한 활동 추천을 할 수 없습니다.');
  }

  return recommendations;
}

// 날씨 정보 가져오기
async function getWeather(city) {
  try {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.weather && data.weather.length > 0) {
      const weatherConditions = data.weather.map(item => item.main);
      const temperature = data.main.temp;
      const recommendations = recommendActivity(weatherConditions);

      return { weather: weatherConditions.join(', '), temperature, recommendations };
    } else {
      console.error('Error fetching weather data:', data);
      return '날씨 정보를 가져올 수 없습니다.';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return '날씨 정보를 가져올 수 없습니다.';
  }
}

// 날씨 예보 정보 가져오기
async function getWeatherForecast(city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=metric`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.list && data.list.length > 0) {
      const forecastList = data.list;
      const forecasts = forecastList.slice(0, 24 * 3); // 3일치 (3시간 간격)

      const forecastText = forecasts.map((forecast, index) => {
        const time = new Date(forecast.dt * 1000);
        const hour = time.getHours();
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;

        return `${index === 0 ? '오늘' : ''} ${hour}시: ${temperature}°C, ${description}<br>`;
      }).join('\n');

      return `오늘 포함한 3일 간 날씨 예보도 알려드릴게요. (${city}):<br><br>${forecastText}`;
    } else {
      return '날씨 예보 정보를 가져올 수 없습니다.';
    }
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return '날씨 예보 정보를 가져올 수 없습니다.';
  }
}

// 메시지 추가 함수
function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}`;
  messageElement.innerHTML = `<span class="message-content">${message}</span>`;
  const now = new Date();
  const timestamp = `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')} ${now.toLocaleTimeString()}`;
  messageElement.innerHTML += `<br><span class="timestamp">${timestamp}</span>`;
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;

  //local storage에 기록 남기기
  localStorage.setItem('chatHistory', chatLog.innerHTML);
}

// AI 응답 가져오기
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

// 메시지 전송 함수
async function sendMessage() {
  const question = questionInput.value;
  if (!question) return;

  questionInput.value = '';
  appendMessage('user', question);

  const lowerCaseQuestion = question.toLowerCase();
  let aiResponse = '';

  if (lowerCaseQuestion.includes('안녕') || lowerCaseQuestion.includes('hi')) {
    aiResponse = '안녕하세요! 어떤 도움이 필요하신가요?';
  } else if (lowerCaseQuestion.includes('좋은 하루') || lowerCaseQuestion.includes('기분이 좋')
  ||lowerCaseQuestion.includes('좋은 아침')||lowerCaseQuestion.includes('좋은 점심')
  ||lowerCaseQuestion.includes("좋은 저녁")) {
    aiResponse = '기분 좋아보이셔서 다행이네요';
  } else if (lowerCaseQuestion.includes('피곤')) {
    aiResponse = '안타깝군요';
  } else if (lowerCaseQuestion.includes('날씨') || lowerCaseQuestion.includes('weather')) {
    const city = prompt('어떤 도시의 날씨 정보를 알고 싶으신가요? 영어로 입력해주세요.', 'Seoul');
    const { weather, temperature, recommendations } = await getWeather(city);
    const weatherForecast = await getWeatherForecast(city);
    aiResponse = `지역: ${city}<br><br>날씨: ${weather}<br>온도: ${temperature}°C<br><br>${recommendations.join('<br>')}<br><br>${weatherForecast}`;
  } else if (lowerCaseQuestion.includes('가볼게')) {
    aiResponse = '서비스를 종료합니다.';
  } else {
    aiResponse = await getAIResponse(question);
  }

  appendMessage('AI', aiResponse);
  localStorage.setItem('chatHistory', chatLog.innerHTML);
}

// 대화 기록 삭제 버튼 클릭 시
const clearChatButton = document.getElementById('clearChatButton');
clearChatButton.addEventListener('click', clearChatHistory);

function clearChatHistory() {
  chatLog.innerHTML = '';
  localStorage.removeItem('chatHistory');
}
