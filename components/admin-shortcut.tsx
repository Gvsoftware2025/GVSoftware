"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function AdminShortcut() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl + Shift + A
      if (event.ctrlKey && event.shiftKey && event.key === "A") {
        event.preventDefault()
        router.push("/admin/portfolio")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router])

  return null
}
