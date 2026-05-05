'use client'

import { useMatches } from '@/hooks/use-matches'
import { useEvents } from '@/hooks/use-events'
import { useHouses } from '@/hooks/use-houses'

export function LiveTicker() {
  const { events: ongoingEvents, loading: eventsLoading } =
    useEvents('ongoing')
  const { houses } = useHouses()

  if (eventsLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading live events...
      </div>
    )
  }

  if (ongoingEvents.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No events currently ongoing
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {ongoingEvents.map((event) => (
        <TickerItem key={event.id} event={event} houses={houses} />
      ))}
    </div>
  )
}

function TickerItem({
  event,
  houses,
}: {
  event: any
  houses: any[]
}) {
  const { matches, loading } = useMatches(event.id)

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-muted-foreground">
        Loading scores...
      </div>
    )
  }

  const sortedMatches = [...matches].sort(
    (a, b) => (b.score || 0) - (a.score || 0)
  )

  return (
    <div className="bg-card border-l-4 border-l-primary border-r border-b border-t border-border rounded-lg overflow-hidden">
      <div className="bg-primary/10 px-6 py-3 border-b border-border">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          {event.name}
        </h3>
      </div>

      <div className="divide-y divide-border">
        {sortedMatches.map((match, idx) => {
          const house = houses.find((h) => h.id === match.house_id)
          if (!house) return null

          return (
            <div key={match.id} className="px-6 py-4 flex items-center gap-4">
              <div className="font-bold text-lg text-muted-foreground w-8">
                #{idx + 1}
              </div>
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: house.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">
                  {house.display_name}
                </p>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {match.score}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
