import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Motivational Speech Archive",
  description: "랜덤 격언과 영상이 제공되는 동기부여 아카이브",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Motivational Speech Archive",
    description: "명언 갓챠",
    url: "https://motivational-speech-archive.example.com",// 실제 도메인으로 변경 필요
    siteName: "Motivational Speech Archive",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Motivational Speech Archive",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
