"use client"

import type React from "react"

import { Instagram, Facebook } from "lucide-react"
import { toast } from "sonner"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
    </svg>
  )
}

export function FloatingSocial() {
  const handleTikTokClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toast.info("🎵 TikTok - Em breve!", {
      description: "Nossa página no TikTok estará disponível em breve. Fique ligado!",
      duration: 4000,
    })
  }

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/gv_software",
      gradient: "from-purple-600 via-pink-600 to-orange-500",
      glowColor: "rgba(236, 72, 153, 0.4)",
      onClick: null,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/gvsoftw",
      gradient: "from-blue-600 via-blue-500 to-indigo-600",
      glowColor: "rgba(59, 130, 246, 0.4)",
      onClick: null,
    },
    {
      name: "TikTok",
      icon: TikTokIcon,
      href: "#",
      gradient: "from-cyan-400 via-pink-500 to-purple-600",
      glowColor: "rgba(168, 85, 247, 0.4)",
      onClick: handleTikTokClick,
    },
  ]

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .social-icon-btn {
          animation: float 3s ease-in-out infinite;
        }

        .social-icon-btn:nth-child(1) {
          animation-delay: 0s;
        }

        .social-icon-btn:nth-child(2) {
          animation-delay: 0.5s;
        }

        .social-icon-btn:nth-child(3) {
          animation-delay: 1s;
        }
      `}</style>

      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4">
        {socialLinks.map((social, index) => {
          const Icon = social.icon
          return (
            <div key={social.name} className="group relative social-icon-btn">
              {/* Glow Background */}
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${social.gradient} blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500 -z-10`}
                style={{
                  animation: "glow-pulse 2s ease-in-out infinite",
                  animationDelay: `${index * 0.3}s`,
                }}
              />

              {/* Button */}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                onClick={social.onClick || undefined}
                className={`
                  relative flex items-center justify-center
                  w-12 h-12 rounded-xl
                  bg-gradient-to-br ${social.gradient}
                  hover:scale-110
                  transition-all duration-300
                  shadow-lg
                  border border-white/20 hover:border-white/40
                  cursor-pointer
                `}
                style={{
                  boxShadow: `0 4px 20px ${social.glowColor}`,
                }}
              >
                <Icon className="w-6 h-6 text-white relative z-10" strokeWidth={2} />
              </a>
            </div>
          )
        })}

        {/* Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/10 to-transparent -z-20" />
      </div>
    </>
  )
}
