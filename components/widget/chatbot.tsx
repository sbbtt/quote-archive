"use client";

import { useState, useRef, useEffect } from "react";

export function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([
    {
      from: "bot",
      text: "지금 기분이나 상황을 한 줄로 적어보세요. 어울리는 격언을 추천해 드릴게요.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");

    // 오픈ai api 호출
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      console.log("data", data);
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "AI 추천에 실패했어요." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="w-96 rounded-xl bg-zinc-900 text-white shadow-2xl flex flex-col overflow-hidden">
        <div className="px-3 py-2 text-xs font-semibold bg-zinc-800 flex items-center justify-between">
          <span>🤖 챗봇과 대화해보세요.</span>
          <span className="text-[10px] text-zinc-400">AI 베타</span>
        </div>
        {/* <div className="flex-1 max-h-72 px-3 py-2 space-y-1 text-xs overflow-y-auto"> */}
        <div className="flex-1 max-h-[360px] px-4 py-3 space-y-2 text-sm overflow-y-auto">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.from === "user"
                  ? "text-right text-blue-300"
                  : "text-left text-zinc-200"
              }
            >
              {m.text.split("\n").map((line, idx) => (
                <div key={idx}>{line || <>&nbsp;</>}</div>
              ))}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex border-t border-zinc-700 bg-zinc-900">
          <input
            className="flex-1 bg-transparent px-3 py-3 text-base outline-none"
            placeholder="예: 번아웃이 온 것 같아요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-5 py-2 text-base text-blue-500 hover:text-blue-300 font-semibold"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
