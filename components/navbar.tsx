"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Serviços", href: "/servicos" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Sobre", href: "/sobre" },
    { name: "FAQ", href: "/faq" },
  ]

  // Atalho para admin
  useEffect(() => {
    console.log("🔧 Navbar: Event listener adicionado")

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("🔍 Navbar keydown:", {
        key: event.key,
        code: event.code,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
      })

      // Detectar Ctrl+Shift+A
      if (event.ctrlKey && event.shiftKey && (event.key === "A" || event.key === "a" || event.code === "KeyA")) {
        console.log("🎯 ATALHO DETECTADO NO NAVBAR!")
        event.preventDefault()
        event.stopPropagation()

        // Definir acesso
        sessionStorage.setItem("admin-access", "granted")
        console.log("✅ Acesso definido no navbar")

        // Redirecionar
        window.location.href = "/j9/k0"
      }
    }

    document.addEventListener("keydown", handleKeyDown, { capture: true })

    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true })
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
              <span className="text-sm font-bold text-white">GV</span>
            </div>
            <span className="hidden font-bold sm:inline-block">GV Software</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
                  <span className="text-sm font-bold text-white">GV</span>
                </div>
                <span className="font-bold">GV Software</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-3 mt-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-2 py-1 text-lg transition-colors hover:text-foreground/80 ${
                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
                <span className="text-sm font-bold text-white">GV</span>
              </div>
              <span className="font-bold">GV Software</span>
            </Link>
          </div>
          <nav className="flex items-center">
            <Button asChild>
              <Link href="/contato">Contato</Link>
            </Button>
          </nav>
        </div>
      </div>
    </nav>
  )
}
