import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface SuperSenior {
  id: string
  name: string
  house_id: string
  bio: string | null
  achievements: string | null
  photo_url: string | null
  year_graduated: number | null
  created_at: string
}

export function useSuperSeniors(houseId?: string) {
  const [seniors, setSeniors] = useState<SuperSenior[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSeniors = async () => {
      try {
        const supabase = createClient()
        let query = supabase.from('super_seniors').select('*')

        if (houseId) {
          query = query.eq('house_id', houseId)
        }

        const { data, error } = await query.order('year_graduated', {
          ascending: false,
        })

        if (error) {
          setError(error.message)
          setSeniors([])
        } else {
          setSeniors(data || [])
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch super seniors'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchSeniors()
  }, [houseId])

  return { seniors, loading, error }
}
