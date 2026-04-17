import type { Metadata } from "next";
import { Geist, Geist_Mono, Gotu } from "next/font/google";
import { AuthProvider } from "@/components/common/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gotu = Gotu({
  variable: "--font-gotu",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SITREZHUTHU - Create Your Own Portfolio",
  description:
    "Build a refined, personal portfolio with live editing, elegant layouts, and one-click sharing.",
  keywords: ["portfolio", "resume", "showcase", "creator", "projects"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${gotu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
