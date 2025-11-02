"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Mail, Phone } from "lucide-react"
import { toast } from "sonner"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Camada Rosa (deslocada para direita/baixo) */}
      <path
        d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"
        fill="#FF004F"
        opacity="0.75"
        transform="translate(0.5, 0.5)"
      />
      {/* Camada Ciano (deslocada para esquerda/cima) */}
      <path
        d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"
        fill="#00F2EA"
        opacity="0.75"
        transform="translate(-0.5, -0.5)"
      />
      {/* Camada Branca (centro) */}
      <path
        d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Footer() {
  const handleTikTokClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toast.info("🎵 TikTok - Em breve!", {
      description: "Nossa página no TikTok estará disponível em breve. Fique ligado!",
      duration: 4000,
    })
  }

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-purple-500/20 overflow-hidden">
      {/* Efeito de fundo animado */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Linha decorativa com gradiente no topo */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Coluna 1: Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-50"></div>
                <Image
                  src="/gv-logo-new.png"
                  alt="GV Software Logo"
                  width={60}
                  height={60}
                  className="w-15 h-15 relative z-10 transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-300% animate-gradient-x">
                  GV SOFTWARE
                </span>
                <span className="text-sm text-gray-400 -mt-1">Inovação & Tecnologia</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transformando ideias em soluções digitais inovadoras. Desenvolvimento web, mobile e sistemas
              personalizados para o seu negócio.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center">
              <span className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent mr-3"></span>
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Início", href: "/" },
                { name: "Serviços", href: "/servicos" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Sobre", href: "/sobre" },
                { name: "Contato", href: "/contato" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center">
              <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mr-3"></span>
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400 text-sm group cursor-pointer hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5 text-purple-400 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                <span>contato@gvsoftware.com.br</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 text-sm group cursor-pointer hover:text-blue-400 transition-colors">
                <Phone className="w-5 h-5 text-purple-400 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                <span>(17) 99785-3416</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center">
              <span className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent mr-3"></span>
              Redes Sociais
            </h3>
            <p className="text-gray-400 text-sm mb-4">Siga-nos e fique por dentro das novidades</p>
            <div className="flex space-x-3">
              <a
                href="https://instagram.com/gv_software"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:border-pink-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors relative z-10" />
              </a>

              <a
                href="https://www.facebook.com/gvsoftw"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors relative z-10" />
              </a>

              <button
                onClick={handleTikTokClick}
                className="group relative w-12 h-12 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:border-cyan-500/50 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <TikTokIcon className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors relative z-10" />
              </button>
            </div>
          </div>
        </div>

        {/* Linha divisória com efeito de brilho */}
        <div className="relative mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-32 h-2 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
        </div>

        {/* Parte inferior modernizada */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Coluna esquerda - Copyright */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-800/30 border border-slate-700/30 backdrop-blur-sm">
              <span className="text-gray-400">©</span>
              <span className="text-gray-400">{new Date().getFullYear()}</span>
              <span className="w-1 h-1 rounded-full bg-purple-500/50"></span>
              <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                GV Software
              </span>
              <span className="w-1 h-1 rounded-full bg-purple-500/50"></span>
              <span className="text-gray-400 text-sm">Todos os direitos reservados</span>
            </div>
          </div>

          {/* Coluna direita - Links legais */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
            <Link
              href="/termos"
              className="group relative overflow-hidden px-5 py-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 text-sm text-gray-300 hover:text-white transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Termos de Uso
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>

            <Link
              href="/privacidade"
              className="group relative overflow-hidden px-5 py-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 text-sm text-gray-300 hover:text-white transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Política de Privacidade
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .bg-300\% {
          background-size: 300% 300%;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </footer>
  )
}
