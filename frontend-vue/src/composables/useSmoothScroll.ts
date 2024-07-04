import { inject } from 'vue'
import { type SmoothScrollFunction } from '@/types'

export function useSmoothScroll() {
  const smoothScroll = inject('smoothScroll') as SmoothScrollFunction | undefined

  const scrollToElement = (elementId: string, hash?: string) => {
    if (smoothScroll) {
      smoothScroll({
        scrollTo: document.getElementById(elementId),
        hash
      })
    } else {
      console.warn('smoothScroll function is not available')
    }
  }

  return {
    scrollToElement
  }
}
