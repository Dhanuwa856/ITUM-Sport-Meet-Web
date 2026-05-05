import Link from 'next/link'
import { ScoreboardContent } from '@/components/scoreboard-content'

export const metadata = {
  title: 'Live Scoreboard - VarsityPulse',
  description: 'Real-time scores and standings for all inter-house sports events',
}

export default function ScoreboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Live Scoreboard</h1>
          <p className="text-muted-foreground mt-2">
            Real-time scores and standings
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <ScoreboardContent />
      </div>
    </main>
  )
}
