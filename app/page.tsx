"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Quote, QUOTES } from "./_data/qoute";
import { extractYouTubeId, getYouTubeThumbnail } from "./_lib/youtube";
import { ChatBot } from "@/components/widget/chatbot";

const getRandomQuote = (): Quote | null => {
  if (!QUOTES.length) return null;
  const randomIndex = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[randomIndex];
};

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [playVideo, setPlayVideo] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 클라이언트 마운트
  useEffect(() => {
    setMounted(true);
  }, []);

  // 마운트 이후에만 랜덤 선택
  useEffect(() => {
    if (!mounted) return;
    setCurrentQuote(getRandomQuote());
  }, [mounted]);

  const pickRandomQuote = () => {
    const next = getRandomQuote();
    if (!next) return;
    setCurrentQuote(next);
    setPlayVideo(false);
  };

  // 아직 마운트 전이면, SSR과 동일한 고정 뼈대만 렌더
  if (!mounted || !currentQuote) {
    return (
      <div className="min-h-screen bg-black font-sans text-white">
        <main className="w-full max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-8">
          <h1 className="text-5xl mb-5 font-extrabold sm:text-6xl">
            Legendary{" "}
            <span className="text-blue-500">Motivational Speech Archive</span>
          </h1>
          <p className="text-sm text-zinc-500">
            버튼을 눌러 명언과 영상을 불러오세요.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <main className="w-full max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-8">
        <h1 className="text-5xl mb-5 font-extrabold sm:text-6xl">
          Legendary{" "}
          <span className="text-blue-500">Motivational Speech Archive</span>
        </h1>

        <button
          onClick={pickRandomQuote}
          className="mb-8 inline-flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="mr-2 text-2xl">Next</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        <div className="w-full">
          <div className="w-full mb-8 p-6 bg-zinc-900 rounded-lg shadow-sm">
            <p className="mb-1 text-xs text-blue-400 uppercase tracking-widest">
              {currentQuote.category.toUpperCase()}
            </p>
            <p className="text-lg italic text-zinc-100">{currentQuote.text}</p>
            <p className="mt-4 text-md font-semibold text-zinc-300">
              - {currentQuote.author}
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Source: {currentQuote.source}
            </p>

            {currentQuote.videoUrl && (
              <div className="mt-4">
                {!playVideo ? (
                  <button
                    onClick={() => setPlayVideo(true)}
                    className="block w-full text-left"
                  >
                    <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden border border-zinc-800">
                      <Image
                        src={getYouTubeThumbnail(currentQuote.videoUrl) ?? ""}
                        alt="YouTube thumbnail"
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-black/70 flex items-center justify-center">
                          <span className="ml-1 border-l-[14px] border-l-white border-y-[9px] border-y-transparent" />
                        </div>
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden border border-zinc-800">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${extractYouTubeId(
                        currentQuote.videoUrl
                      )}?autoplay=1`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <ChatBot />
        </div>
      </main>
    </div>
  );
}
