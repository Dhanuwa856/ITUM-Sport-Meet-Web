'use client'

import Image from 'next/image'
import { useSuperSeniors } from '@/hooks/use-super-seniors'
import { useHouses } from '@/hooks/use-houses'

export function SuperSeniorsSection() {
  const { seniors, loading, error } = useSuperSeniors()
  const { houses } = useHouses()

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Loading super seniors...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-400">
        Error loading super seniors: {error}
      </div>
    )
  }

  if (seniors.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No super seniors to display
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {seniors.map((senior) => {
        const house = houses.find((h) => h.id === senior.house_id)

        return (
          <div
            key={senior.id}
            className="rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              {senior.photo_url ? (
                <Image
                  src={senior.photo_url}
                  alt={senior.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-muted text-muted-foreground text-4xl font-bold">
                  {senior.name[0]}
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold text-foreground">{senior.name}</h3>
              {house && (
                <div className="flex items-center gap-2 mt-2 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: house.color }}
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    {house.display_name}
                  </span>
                </div>
              )}

              {senior.bio && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {senior.bio}
                </p>
              )}

              {senior.achievements && (
                <div className="text-xs text-primary font-medium">
                  {senior.achievements}
                </div>
              )}

              {senior.year_graduated && (
                <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                  Graduated {senior.year_graduated}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
