import { useEffect, useCallback, useRef } from 'react'
import { useCyraStore } from '@/store'
import { searchPlanetary } from '@/services/search'

export function useSearch() {
  const {
    searchQuery,
    searchResults,
    setSearchQuery,
    setSearchResults,
    clearSearch,
    isSearchOpen,
    openSearch,
    closeSearch,
    toggleSearch,
  } = useCyraStore()

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleQueryChange = useCallback(
    (query: string) => {
      setSearchQuery(query)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (!query.trim()) {
        setSearchResults([])
        return
      }
      debounceRef.current = setTimeout(() => {
        const results = searchPlanetary(query)
        setSearchResults(results)
      }, 150)
    },
    [setSearchQuery, setSearchResults]
  )

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return {
    searchQuery,
    searchResults,
    isSearchOpen,
    handleQueryChange,
    clearSearch,
    openSearch,
    closeSearch,
    toggleSearch,
  }
}
