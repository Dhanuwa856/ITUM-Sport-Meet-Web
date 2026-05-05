import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface SportEvent {
  id: string
  name: string
  sport_type: string
  event_date: string
  location: string
  status: 'scheduled' | 'ongoing' | 'completed'
  points_available: number
  description: string | null
  created_at: string
  updated_at: string
}

export function useEvents(status?: string) {
  const [events, setEvents] = useState<SportEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const supabase = createClient()
        let query = supabase.from('sports_events').select('*')

        if (status) {
          query = query.eq('status', status)
        }

        const { data, error } = await query.order('event_date', {
          ascending: true,
        })

        if (error) {
          setError(error.message)
          setEvents([])
        } else {
          setEvents(data || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [status])

  return { events, loading, error }
}
