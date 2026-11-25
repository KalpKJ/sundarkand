import { useEffect, useState } from 'react'

/** Id of the last section whose top has passed under the sticky header. */
export function useActiveSection(sections) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      let current = null
      for (const { id } of sections) {
        const element = document.getElementById(id)
        if (!element || element.getBoundingClientRect().top > 160) break
        current = id
      }
      setActiveId(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [sections])

  return activeId
}
