import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vibe Wall - Share Your Vibes",
  description: "Share your vibes with the community",
  icons: {
    icon: "favicon_io/favicon.ico",
    shortcut: "favicon_io/favicon-16x16.png",
    apple: "favicon_io/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
