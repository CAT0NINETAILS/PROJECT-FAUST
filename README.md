# 🧠 파우스트 디스코드 봇 (Railway 배포용)

이 봇은 GPT 없이 작동하며, Ollama의 Mistral 모델을 사용합니다.  
Railway에 배포하면 언제든 깨어 있는 파우스트를 만들 수 있어요.

## 🚀 배포 방법

1. 이 저장소를 GitHub에 업로드
2. Railway 접속 → New Project → Deploy from GitHub Repo
3. Build command: `npm install`
4. Start command: `node index.js`
5. Background Worker 타입으로 생성
6. 환경 변수 설정:

| Key             | Value 예시 |
|----------------|------------|
| DISCORD_TOKEN  | (디스코드 봇 토큰) |
| OLLAMA_BASE_URL | http://localhost:11434 |
| OLLAMA_MODEL   | mistral |
| SYSTEM_PROMPT  | 파우스트 인격 설정 |

