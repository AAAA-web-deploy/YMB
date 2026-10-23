import type { Metadata } from "next";
import type { ReactNode } from "react";
import { assetPath } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "You Missed Bitches ($YMB) — You watched. You waited. You missed.",
  description: "You Missed Bitches ($YMB). An Ethereum memecoin. You watched. You waited. You missed.",
  icons: { icon: assetPath("assets/logo.png") },
  openGraph: {
    title: "You Missed Bitches ($YMB)",
    description: "You watched. You waited. You missed.",
    images: [assetPath("assets/banner.png")],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#080A0D",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href={assetPath("assets/fonts/fonts.css")} />
      </head>
      <body>{children}</body>
    </html>
  );
}
