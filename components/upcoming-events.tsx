'use client'

import { useEvents } from '@/hooks/use-events'
import { EventCard } from './event-card'

export function UpcomingEvents() {
  const { events, loading, error } = useEvents('scheduled')

  if (loading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading upcoming events...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-400">
        Error loading events: {error}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No upcoming events scheduled
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.slice(0, 3).map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
