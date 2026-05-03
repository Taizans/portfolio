import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import LenisProvider from "./components/LenisProvider"
import AuroraBackground from "./components/AuroraBackground"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Tiziano Jhonny Floriddia — AI Engineer",
  description:
    "AI Engineer @ Alstom Ferroviaria. Machine Learning on industrial data, process automation, Microsoft Power Platform.",
  metadataBase: new URL("https://tizianofloriddia.pages.dev"),
  openGraph: {
    title: "Tiziano Jhonny Floriddia — AI Engineer",
    description:
      "ML systems on operational railway data. 58k labeled notifications, 74.5% auto-classified in production.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <AuroraBackground />
        <LenisProvider />
        {children}
      </body>
    </html>
  )
}
