"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogoClick = () => {
    setClickCount((prev) => prev + 1)

    setTimeout(() => {
      setClickCount(0)
    }, 1000)

    if (clickCount === 2) {
      router.push("/admin/portfolio")
      setClickCount(0)
    }
  }

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre" },
    { href: "/servicos", label: "Serviços" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/faq", label: "FAQ" },
  ]

  return (
    <>
      <style jsx global>{`
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes logo-pulse {
          0%,
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6));
          }
        }

        .gradient-text {
          background: linear-gradient(45deg, #8b5cf6, #06b6d4, #ec4899, #3b82f6);
          background-size: 300% 300%;
          animation: gradient-flow 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-animation {
          animation: logo-pulse 3s ease-in-out infinite;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/98 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div onClick={handleLogoClick} className="cursor-pointer">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <Image
                    src="/gv-logo-new.png"
                    alt="GV Software Logo"
                    width={80}
                    height={80}
                    className="w-20 h-20 transition-transform duration-300 group-hover:scale-110 logo-animation"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold gradient-text">GV Software</span>
                  <span className="text-sm text-purple-400 -mt-1 font-medium">Inovação & Tecnologia</span>
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
              >
                <Link href="/contato">Contato</Link>
              </Button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-950/98 backdrop-blur-xl border-t border-purple-500/20">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full font-semibold mt-4 w-fit"
                >
                  <Link href="/contato" onClick={() => setIsMenuOpen(false)}>
                    Contato
                  </Link>
                </Button>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
