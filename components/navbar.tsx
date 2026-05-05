'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/scoreboard', label: 'SCOREBOARD' },
    { href: '/schedule', label: 'SCHEDULE' },
    { href: '/gallery', label: 'GALLERY' },
  ]

  return (
    <nav className="sticky top-0 z-50">
      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 backdrop-blur-md bg-background/80 border-b border-primary/20"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 flex items-center justify-between h-20">
        {/* Logo/Branding */}
        <Link 
          href="/" 
          className="flex flex-col items-center gap-0 font-black text-2xl hover:text-primary transition-colors duration-300 group"
        >
          <span className="text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            Sport Meet
          </span>
          <span className="text-xs text-primary/70 tracking-widest font-mono group-hover:text-primary/100 transition-colors">
            ITUM
          </span>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 font-semibold text-xs tracking-widest transition-all duration-300 group ${
                isActive(item.href)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {item.label}
              {/* Gold underline on active */}
              {isActive(item.href) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              )}
              {/* Hover effect */}
              {!isActive(item.href) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile menu indicator */}
        <div className="md:hidden flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs font-bold tracking-wider transition-colors ${
                isActive(item.href)
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {item.label.charAt(0)}
            </Link>
          ))}
        </div>

        {/* Right side decoration */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-px h-6 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
          <div className="text-xs text-primary/60 font-mono tracking-widest">EST 2026</div>
        </div>
      </div>
    </nav>
  )
}
