import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface GalleryImage {
  id: string
  title: string
  description: string | null
  image_url: string
  category: string
  event_id: string | null
  house_id: string | null
  uploaded_by: string | null
  upload_date: string
  created_at: string
}

export function useGallery(category?: string) {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const supabase = createClient()
        let query = supabase.from('gallery_images').select('*')

        if (category) {
          query = query.eq('category', category)
        }

        const { data, error } = await query.order('created_at', {
          ascending: false,
        })

        if (error) {
          setError(error.message)
          setImages([])
        } else {
          setImages(data || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch images')
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [category])

  return { images, loading, error }
}
