"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Início", href: "/" },
  { name: "Serviços", href: "/servicos" },
  { name: "Portfólio", href: "/portfolio" },
  { name: "Sobre", href: "/sobre" },
  { name: "FAQ", href: "/faq" },
]

export default function ModernHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [adminClickCount, setAdminClickCount] = useState(0)
  const pathname = usePathname()
  const router = useRouter()

  // Reset admin click count after 3 seconds
  useEffect(() => {
    if (adminClickCount > 0) {
      const timer = setTimeout(() => setAdminClickCount(0), 3000)
      return () => clearTimeout(timer)
    }
  }, [adminClickCount])

  // Handle admin access on mobile (double click logo)
  const handleLogoClick = () => {
    setAdminClickCount((prev) => prev + 1)
    if (adminClickCount === 1) {
      // Double click detected
      router.push("/admin")
      setAdminClickCount(0)
    }
  }

  // Handle admin access on desktop (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault()
        router.push("/admin")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router])

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-purple-900/10 to-blue-900/10 backdrop-blur-xl border-b border-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-blue-600/5 animate-pulse"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={handleLogoClick}>
            <div className="relative">
              {/* Logo Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl opacity-20 animate-spin-slow"></div>

              {/* Logo */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500 animate-float">
                <span className="text-white font-black text-xl tracking-tight">GV</span>

                {/* Floating Particles */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Animated Text */}
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 via-pink-200 via-blue-200 to-white bg-clip-text text-transparent animate-gradient-shift bg-[length:400%_400%]">
                GV Software
              </span>
              <span className="text-xs text-gray-400 font-medium">Inovação & Tecnologia</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group",
                  pathname === item.href
                    ? "text-white bg-white/10 shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/5",
                )}
              >
                <span className="relative z-10">{item.name}</span>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Active Indicator */}
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                )}

                {/* Hover Wave Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-lg"></div>
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Link href="/contato">
              <Button className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 border border-purple-500/30 group overflow-hidden">
                <span className="relative z-10">Contato</span>

                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Sliding Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 border-l border-purple-500/30 backdrop-blur-xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center space-x-3 pb-6 border-b border-purple-500/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-black text-lg">GV</span>
                  </div>
                  <div>
                    <span className="text-lg font-bold text-white">GV Software</span>
                    <p className="text-sm text-gray-400">Menu de Navegação</p>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 py-6">
                  <div className="space-y-2">
                    {navigation.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                          pathname === item.href
                            ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-purple-500/30"
                            : "text-gray-300 hover:text-white hover:bg-white/5",
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            pathname === item.href
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"
                              : "bg-gray-600 group-hover:bg-purple-400",
                          )}
                        ></div>
                        <span className="font-medium">{item.name}</span>
                        {pathname === item.href && <Star className="w-4 h-4 text-yellow-400 animate-spin ml-auto" />}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Mobile Contact Button */}
                <div className="pt-6 border-t border-purple-500/20">
                  <Link href="/contato" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg border border-purple-500/30">
                      Entrar em Contato
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 4s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </header>
  )
}
