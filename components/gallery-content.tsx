'use client'

import { useState } from 'react'
import { useGallery } from '@/hooks/use-gallery'
import { GalleryItem } from './gallery-item'
import { ImageModal } from './image-modal'
import { GalleryImage } from '@/hooks/use-gallery'

export function GalleryContent() {
  const { images, loading, error } = useGallery()
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get all unique categories
  const categories = Array.from(new Set(images.map((img) => img.category)))

  // Filter images by selected category
  const filteredImages = selectedCategory
    ? images.filter((img) => img.category === selectedCategory)
    : images

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Loading gallery...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-400">
        Error loading gallery: {error}
      </div>
    )
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border hover:border-primary'
            }`}
          >
            All ({images.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border hover:border-primary'
              }`}
            >
              {category} ({images.filter((img) => img.category === category).length})
            </button>
          ))}
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No images in this category
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <GalleryItem
              key={image.id}
              image={image}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      )}

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={() => {
            const currentIdx = filteredImages.findIndex(
              (img) => img.id === selectedImage.id
            )
            if (currentIdx < filteredImages.length - 1) {
              setSelectedImage(filteredImages[currentIdx + 1])
            }
          }}
          onPrev={() => {
            const currentIdx = filteredImages.findIndex(
              (img) => img.id === selectedImage.id
            )
            if (currentIdx > 0) {
              setSelectedImage(filteredImages[currentIdx - 1])
            }
          }}
        />
      )}
    </>
  )
}
