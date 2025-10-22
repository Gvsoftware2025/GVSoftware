import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { FloatingSocial } from "@/components/floating-social"
import { Toaster } from "@/components/ui/sonner"
import { ScrollReset } from "@/components/scroll-reset"
import { AdminShortcut } from "@/components/admin-shortcut"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GV Software - Inovação & Tecnologia",
  description: "Transformando suas ideias em realidade digital com soluções inovadoras e tecnologia de ponta.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ScrollReset />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingSocial />
          <AdminShortcut />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
