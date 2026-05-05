'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { GalleryImage } from '@/hooks/use-gallery'

interface ImageModalProps {
  image: GalleryImage
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function ImageModal({
  image,
  onClose,
  onNext,
  onPrev,
}: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrev])

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="max-w-4xl max-h-[90vh] flex flex-col bg-card rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 relative overflow-hidden">
          <Image
            src={image.image_url}
            alt={image.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="p-6 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {image.title}
          </h2>
          {image.description && (
            <p className="text-muted-foreground mb-4">{image.description}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-sm font-medium capitalize">
                {image.category}
              </span>
              {image.uploaded_by && (
                <span className="text-xs text-muted-foreground">
                  by {image.uploaded_by}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onPrev}
                className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                ← Prev
              </button>
              <button
                onClick={onNext}
                className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Next →
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-muted text-muted-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
