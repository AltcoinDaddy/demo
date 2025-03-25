import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NFT Explorer | Powered by Chainbase",
  description: "Explore NFT collections, track floor prices, and view recent sales with Chainbase data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">NFT Explorer</h1>
                  <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded-full border border-blue-400/30">
                    Powered by Chainbase
                  </span>
                </div>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-6">
            <div className="container mx-auto px-4 text-center text-sm text-gray-400">
              <p>© {new Date().getFullYear()} NFT Explorer. Powered by Chainbase API.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}