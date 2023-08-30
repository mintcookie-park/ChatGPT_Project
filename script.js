const chatLog = document.getElementById('chat-log');
const questionInput = document.getElementById('questionInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', sendMessage);
questionInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}`;
  messageElement.innerText = message;
  chatLog.appendChild(messageElement);

  console.log(`${sender}: ${message}`);

  chatLog.scrollTop = chatLog.scrollHeight;
}

async function getAIResponse(question) {
  const apiKey = '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';
  const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  
  const data = {
    prompt: question,
    max_tokens: 50,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    if (responseData.choices && responseData.choices.length > 0) {
      return responseData.choices[0].text.trim();
    } else {
      return 'AI 응답을 가져올 수 없습니다.';
    }
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'AI 응답을 가져올 수 없습니다.';
  }
}

// 날씨 정보 가져오기
async function getWeather(city) {
  const apiKey = '2236ec0e8876127f99e3896d9771926e';
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(endpoint);
  const data = await response.json();

  if (data.weather && data.weather.length > 0) {
    return data.weather[0].main;
  } else {
    console.error('Error fetching weather data:', data);
    return '날씨 정보를 가져올 수 없습니다.';
  }
}

function recommendActivity(weather) {
    switch (weather) {
        case 'Clear':
          return ['맑은 날씨입니다!', ' ','맑은 날씨에는 야외 산책을 추천해요!',' ','바닷가에서 휴식하기도 좋아요.'];
        case 'Clouds':
          return ['흐립니다!',' ','흐린 날씨에는 도서관에서 책을 읽는 건 어떨까요?', ' ','실내에서 영화를 보는 것도 좋아요.'];
        case 'Rain':
          return ['비가 내립니다!', ' ','비오는 날엔 영화를 보면 좋겠어요!', ' ','카페에서 따뜻한 음료와 함께 시간을 보내보세요.'];
        case 'Snow':
          return ['눈이 내립니다!', ' ','눈 오는 날에는 눈싸움을 해보는 건 어떨까요?', ' ','실내에서 따뜻한 차를 마시며 영화를 보는 것도 좋아요.'];
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

  if (lowerCaseQuestion.includes('안녕')) {
    aiResponse = '안녕하세요! 어떤 도움이 필요하신가요?';
  } else if (lowerCaseQuestion.includes('날씨')) {
    //default 값은 서울, 그리고 날씨 관련 물음에 잇따라 지역 날씨를 알 수 있다.
    const city = prompt('어떤 도시의 날씨 정보를 알고 싶으신가요? 영어로 입력해주세요.', 'Seoul');
    const weather = await getWeather(city);
    const recommendation = recommendActivity(weather);
    aiResponse = recommendation;
  } else {
    aiResponse = await getAIResponse(question);
  }

  appendMessage('AI', aiResponse);
}