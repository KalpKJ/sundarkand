import { useEffect, useState } from 'react'

/** Search text and the saved-only filter, mirrored in the query string. */
export function useUrlFilter() {
  const [filter, setFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return { query: params.get('q') ?? '', savedOnly: params.get('view') === 'saved' }
  })

  useEffect(() => {
    const url = new URL(window.location.href)
    if (filter.query) url.searchParams.set('q', filter.query)
    else url.searchParams.delete('q')
    if (filter.savedOnly) url.searchParams.set('view', 'saved')
    else url.searchParams.delete('view')
    window.history.replaceState(null, '', url)
  }, [filter])

  return [filter, setFilter]
}
