import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function FloatingControls() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 360)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!showTop) return null

  return (
    <div className="fixed right-5 bottom-5 z-40">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className="brand-gradient-bg brand-glow flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  )
}
