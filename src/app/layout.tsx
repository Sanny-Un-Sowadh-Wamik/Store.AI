import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Store.AI - AI-Powered Retail Analytics",
  description: "Transform your sales data into actionable insights with AI. Natural language insights and automated alerts for independent retail stores.",
  keywords: ["retail analytics", "AI insights", "sales analytics", "small business", "retail software"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
