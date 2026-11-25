import { useEffect, useState } from 'react'

function read(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored === null ? fallback : JSON.parse(stored)
  } catch {
    return fallback
  }
}

/** useState that survives a reload. Falls back to memory if storage is blocked. */
export function useStoredState(key, fallback, isValid) {
  const [value, setValue] = useState(() => {
    const stored = read(key, fallback)
    return isValid(stored) ? stored : fallback
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage can be full or disabled; the reader still works without it.
    }
  }, [key, value])

  return [value, setValue]
}
