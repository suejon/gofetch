import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import TRPCProvider from "@/utils/TRPCProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gofetch",
  description: "Read and learn lagnauge through the news",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <TRPCProvider>
          <Header />
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
