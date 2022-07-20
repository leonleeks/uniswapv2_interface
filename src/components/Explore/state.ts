import { SupportedChainId } from 'constants/chains'
import { TimePeriod } from 'hooks/useTopTokens'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback } from 'react'

export const favoritesAtom = atomWithStorage<string[]>('favorites', [])
export const showFavoritesAtom = atomWithStorage<boolean>('showFavorites', false)
export const filterNetworkAtom = atom<SupportedChainId>(SupportedChainId.MAINNET)
export const filterStringAtom = atom<string>('')
export const filterTimeAtom = atom<TimePeriod>(TimePeriod.day)

export function useToggleFavorite(tokenAddress: string) {
  const [favoriteTokens, updateFavoriteTokens] = useAtom(favoritesAtom)

  return useCallback(() => {
    let updatedFavoriteTokens
    if (favoriteTokens.includes(tokenAddress)) {
      updatedFavoriteTokens = favoriteTokens.filter((address: string) => {
        return address !== tokenAddress
      })
    } else {
      updatedFavoriteTokens = [...favoriteTokens, tokenAddress]
    }
    updateFavoriteTokens(updatedFavoriteTokens)
  }, [favoriteTokens, tokenAddress, updateFavoriteTokens])
}
