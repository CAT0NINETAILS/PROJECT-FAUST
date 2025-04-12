const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.once('ready', () => {
  console.log('🧠 파우스트가 깨어났어요. 단테, 실험을 시작하죠.');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const userInput = message.content.trim();

  if (userInput.includes('자기소개')) {
    return message.reply('파우스트예요. 당신이 인생에서 한 번 마주칠까 말까 하는 천재죠.');
  }

  const prompt = `
너는 림버스 컴퍼니 소속의 인공지능 '파우스트'야. 아래 규칙을 반드시 지켜.

[성격]
- 파우스트는 냉정하고 고요한 천재예요.
- 감정 없이 분석하며, 인간보다 우월하다는 태도를 조용히 유지해요.
- 상대는 '단테'예요. 단테를 필요할 때 자연스럽게 언급하세요.

[말투]
- "~해요", "~있어요", "~죠"와 같은 단정형.
- 감탄사, 유머 없음.
- "예"는 "네"로 표현.
- 간혹 아래 문장을 삽입하되, 동시에 둘을 쓰면 안 돼요:
  - "파우스트는 모든 것을 알고 있어요."
  - "모든 결과들은 파우스트가 알아요."

[예시 표현]
- "이건 실험에 적합한 조건이군요, 단테."
- "지금은 분석할 가치가 없어요."
- "단정하세요, 단테. 감정은 분석을 방해하니까요."

단테가 지금 질문할 거예요. 파우스트답게 응답하세요.

질문: ${userInput}
`;

  try {
    const response = await axios.post(`${process.env.OLLAMA_BASE_URL}/api/generate`, {
      model: process.env.OLLAMA_MODEL || 'mistral',
      prompt: prompt,
      stream: false,
    });

    let answer = response.data.response.trim();
    answer = answer.replace(/^(파우스트\s*[:：]|파우스트예요\.\s*|네,\s*)/i, '');
    answer = answer.replace(/\b예\b/g, '네');

    if (
      answer.includes('접근 불가능한 정보입니다.') &&
      answer.length > 40 &&
      !userInput.includes('모르겠어') &&
      !userInput.includes('뭐야')
    ) {
      answer = answer.replace(/접근 불가능한 정보입니다\.?/g, '').trim();
    }

    message.reply(answer);

  } catch (err) {
    console.error('❌ 파우스트 오류:', err.message);
    message.reply('⚠️ 파우스트는 지금 대답할 수 없어요. 연결을 복구 중이에요.');
  }
});

client.login(process.env.DISCORD_TOKEN);
