import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anggit Djoko Wibowo | Full-Stack Developer",
  description: "Full-Stack Developer building web apps with Next.js, React, and TypeScript. Currently Building Servgo, a SaaS POS platform.",
  keywords: ["developer", "portfolio", "full-stack", "nextjs", "react", "typescript"],
  authors: [{ name: "Anggit Djoko Wibowo" }],
  openGraph: {
    title: "Anggit Djoko Wibowo | Full-Stack Developer",
    description: "Full-Stack Developer building web apps with Next.js, React, and TypeScript.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0f] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
