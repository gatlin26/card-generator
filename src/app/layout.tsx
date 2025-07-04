import type { Metadata } from "next";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
import { LayoutWrapper } from "@/components/layout-wrapper";

export const metadata: Metadata = {
  title: "CardCraft - Create Beautiful Cards for Social Media",
  description: "Create stunning visual cards from your text content. Perfect for social media, blogs, and newsletters. Design beautiful quote cards, lists, and more with our intuitive editor.",
  keywords: "card maker, social media design, visual content, quote cards, text to image",
  authors: [{ name: "CardCraft Team" }],
  creator: "CardCraft",
  publisher: "CardCraft",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="font-sans">
        <Providers>
          <TooltipProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            <Toaster />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
} 