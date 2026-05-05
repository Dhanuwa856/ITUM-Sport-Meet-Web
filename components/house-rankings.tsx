'use client'

import { useHouses } from '@/hooks/use-houses'
import { HouseCard } from './house-card'

export function HouseRankings() {
  const { houses, loading, error } = useHouses()

  if (loading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading house rankings...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-400">
        Error loading rankings: {error}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {houses.map((house, idx) => (
        <HouseCard key={house.id} house={house} rank={idx + 1} />
      ))}
    </div>
  )
}
