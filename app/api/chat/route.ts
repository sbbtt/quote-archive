import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// POST 핸들러
export async function POST(request: NextRequest) {
  const { text } = await request.json();

  // 명언 한줄 프롬프트 예시 (필요시 직접 변경)
const prompt = `
너는 명언을 추천하는 AI 챗봇이야.
아래 상황에 어울리는 실제 유명인의 명언 한 줄과 저자를 첫 번째 줄에 출력해.
두 번째 줄은 반드시 한 줄의 공백(아무 것도 쓰지 마)은 넣고,
세 번째 줄에는, 그 상황에 맞는 구체적 행동 추천 앞에 한 개의 적절한 이모지를 붙여서 한 줄로만 출력해.
(상황 입력, 예시, 리스트, 추가 설명 없이 딱 위의 세 줄로!)
상황: "${text}"
`;




  // Gemini API 엔드포인트 
  const url =
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=" + GEMINI_API_KEY;

  // 외부 API 호출
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 400 }, // 테스트해보고 온도 조절 높을수록 환각발생 확률 증가
    }),
  });

    if (!res.ok) {
    return NextResponse.json({ reply: "AI 추천에 실패했어요." }, { status: 500 });
  }

  const data = await res.json();
  // 필요한 부분만 콘솔에 출력 
  console.log("Gemini API 응답:", data);

  // 명언 파싱 부분
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "추천 결과가 없습니다.";


  return NextResponse.json({ reply });
}
