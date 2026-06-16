import { useCallback } from 'react'
import { useCyraStore } from '@/store'
import { CYRA_MESSAGES } from '@/data/cyra'
import type { PlanetName } from '@/types'

export function useCyra() {
  const { setCyraMessage, cyraMessage, cyraIsTyping, cyraIsVisible } =
    useCyraStore()

  const speakWelcome = useCallback(() => {
    setCyraMessage(CYRA_MESSAGES.welcome, 400)
  }, [setCyraMessage])

  const speakPlanet = useCallback(
    (name: PlanetName) => {
      const msg = CYRA_MESSAGES[name] ?? CYRA_MESSAGES.welcome
      setCyraMessage(msg, 700)
    },
    [setCyraMessage]
  )

  const speakOverview = useCallback(() => {
    setCyraMessage(CYRA_MESSAGES.overview, 400)
  }, [setCyraMessage])

  const speakCompare = useCallback(() => {
    setCyraMessage(CYRA_MESSAGES.compare, 400)
  }, [setCyraMessage])

  const speakLearn = useCallback(() => {
    setCyraMessage(CYRA_MESSAGES.learn, 400)
  }, [setCyraMessage])

  const speakSearch = useCallback(() => {
    setCyraMessage(CYRA_MESSAGES.search, 400)
  }, [setCyraMessage])

  const speakCustom = useCallback(
    (msg: string, delay = 700) => {
      setCyraMessage(msg, delay)
    },
    [setCyraMessage]
  )

  return {
    cyraMessage,
    cyraIsTyping,
    cyraIsVisible,
    speakWelcome,
    speakPlanet,
    speakOverview,
    speakCompare,
    speakLearn,
    speakSearch,
    speakCustom,
  }
}
