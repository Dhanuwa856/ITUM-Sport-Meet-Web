import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface MatchParticipant {
  id: string
  event_id: string
  house_id: string
  score: number
  rank: number | null
  status: 'pending' | 'competing' | 'finished'
  created_at: string
  updated_at: string
}

export function useMatches(eventId?: string) {
  const [matches, setMatches] = useState<MatchParticipant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const supabase = createClient()
        let query = supabase.from('match_participants').select('*')

        if (eventId) {
          query = query.eq('event_id', eventId)
        }

        const { data, error } = await query.order('rank', {
          ascending: true,
          nullsFirst: false,
        })

        if (error) {
          setError(error.message)
          setMatches([])
        } else {
          setMatches(data || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch matches')
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [eventId])

  return { matches, loading, error }
}
