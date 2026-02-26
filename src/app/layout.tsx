import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minimarket Daniela",
  description: "Sistema de Ventas",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen w-full">
          {children}
        </div>
        <Toaster richColors position="bottom-left" />
      </body>
    </html>
  );
}