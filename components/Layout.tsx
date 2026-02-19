import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Stack, Box } from './layoutkit'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/install', label: 'Install' },
  { href: '/cli', label: 'Interactive CLI' },
  { href: '/overview', label: 'System Overview' },
  { href: '/plugin', label: 'Plugin' },
  { href: '/sdk', label: 'SDK' },
  { href: '/security', label: 'Security' },
  { href: '/use-cases', label: 'Use Cases' },
  { href: '/comparisons', label: 'Comparisons' },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter()
  return (
    <Stack gap="none">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={`block px-4 py-2.5 rounded-md text-sm transition-colors ${
            router.pathname === item.href
              ? 'bg-blue-600 text-white font-medium'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </Stack>
  )
}

export default function Layout({ children, title }: { children: React.ReactNode; title?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pageTitle = title ? `${title} - BUILD WITH NEXUS` : 'BUILD WITH NEXUS'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="NEXUS enterprise multi-agent orchestration system documentation" />
      </Head>

      {/* Full-height layout wrapper */}
      <div className="flex min-h-screen bg-gray-950">

        {/* ── Desktop left sidebar ── */}
        <aside className="hidden md:flex flex-col w-60 shrink-0 bg-gray-900 border-r border-gray-800 fixed inset-y-0 left-0 z-30 overflow-y-auto">
          {/* Brand */}
          <div className="px-4 py-5 border-b border-gray-800">
            <Link href="/" className="text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Build With Nexus
            </Link>
          </div>
          {/* Nav links */}
          <nav className="flex-1 px-2 py-4">
            <NavLinks />
          </nav>
          {/* Footer credit */}
          <div className="px-4 py-4 border-t border-gray-800 text-gray-600 text-xs">
            Built by Garrett Eaglin
          </div>
        </aside>

        {/* ── Mobile top bar ── */}
        <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
          <Link href="/" className="text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Build With Nexus
          </Link>
          <button
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
          >
            {mobileOpen ? (
              /* X icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile slide-out overlay ── */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-30 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <div className="relative w-64 bg-gray-900 border-r border-gray-800 flex flex-col pt-16 pb-4 overflow-y-auto">
              <nav className="flex-1 px-2 py-4">
                <NavLinks onNavigate={() => setMobileOpen(false)} />
              </nav>
            </div>
          </div>
        )}

        {/* ── Main content area ── */}
        <div className="flex flex-col flex-1 md:ml-60">
          {/* Spacer for mobile top bar */}
          <div className="md:hidden h-14 shrink-0" />

          <main className="flex-1 overflow-y-auto">
            <Box padding="lg" className="content-container">
              <article className="prose prose-invert max-w-none">
                {children}
              </article>
            </Box>
          </main>

          <footer className="border-t border-gray-800 px-8 py-6 text-center text-gray-500 text-sm">
            NEXUS - Enterprise Multi-Agent Orchestration System
          </footer>
        </div>
      </div>
    </>
  )
}
