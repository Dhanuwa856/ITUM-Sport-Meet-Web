import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface House {
  id: string
  name: string
  display_name: string
  color: string
  logo_url: string | null
  total_points: number
  trophies_won: number
  members_count: number
  created_at: string
}

export function useHouses() {
  const [houses, setHouses] = useState<House[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('houses')
          .select('*')
          .order('total_points', { ascending: false })

        if (error) {
          setError(error.message)
          setHouses([])
        } else {
          setHouses(data || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch houses')
      } finally {
        setLoading(false)
      }
    }

    fetchHouses()
  }, [])

  return { houses, loading, error }
}
