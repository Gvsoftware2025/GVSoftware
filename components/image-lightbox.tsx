"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageLightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export function ImageLightbox({ images, currentIndex, isOpen, onClose, onNext, onPrevious }: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1)

  if (!isOpen) return null

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const resetZoom = () => {
    setZoom(1)
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      {/* Controls */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
        <Button variant="ghost" size="icon" onClick={handleZoomOut} className="text-white hover:bg-white/20">
          <ZoomOut className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={resetZoom} className="text-white hover:bg-white/20">
          {Math.round(zoom * 100)}%
        </Button>
        <Button variant="ghost" size="icon" onClick={handleZoomIn} className="text-white hover:bg-white/20">
          <ZoomIn className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </>
      )}

      {/* Image */}
      <div className="max-w-full max-h-full overflow-auto">
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-none transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
          onClick={resetZoom}
        />
      </div>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}
