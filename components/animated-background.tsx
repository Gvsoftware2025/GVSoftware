"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated mesh gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float-particles" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-float-particles delay-1000" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl animate-float-particles delay-2000" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl animate-float-particles" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern animate-grid-pulse" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90" />

      {/* Mesh gradient effect */}
      <div className="absolute inset-0 bg-mesh-gradient animate-mesh-gradient opacity-40" />

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950/50" />
    </div>
  )
}
