import type { Metadata } from "next";
import { FirebaseAuthProvider } from "@/lib/firebase-auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "SITREZHUTHU — Portfolio Generator",
  description: "Create stunning professional portfolios in minutes. Free forever.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{__html: `
          try {
            if (localStorage.getItem('site-theme') === 'light') {
              document.documentElement.classList.add('light-theme');
            }
          } catch (_) {}
        `}} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
      </body>
    </html>
  );
}
