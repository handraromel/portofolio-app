import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useScroll, useIntersectionObserver } from '@vueuse/core'
import { useRouteHash } from '@vueuse/router'
import { hyphenize } from '@/utils/common'
import { menuItems, THREES_TIMEOUT_BUFFER } from '@/constant'

export function useNavbarBehavior() {
  const { y: scrollY } = useScroll(window)
  const scrolled = computed(() => scrollY.value > 50)
  const mobileMenuOpen = ref(false)
  const currentHash = useRouteHash()
  const isHidden = ref(false)
  const isHovered = ref(false)
  let hideTimer: number | null = null

  const updateHashAndActiveItem = (item: string, updateHash: boolean = true) => {
    if (updateHash) {
      const hash = '#' + hyphenize(item)
      history.pushState(null, '', hash)
    }
    currentHash.value = '#' + hyphenize(item)
  }

  const activeItem = computed(() => {
    const hash = currentHash.value?.slice(1) // Remove the leading '#'
    const matchingItem = menuItems.find(
      (item) => hyphenize(item).toLowerCase() === hash?.toLowerCase()
    )
    return matchingItem || 'HOME'
  })

  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
    resetHideTimer()
  }

  const setupIntersectionObservers = () => {
    menuItems.forEach((item) => {
      const targetId = hyphenize(item)
      const target = document.getElementById(targetId)
      if (target) {
        useIntersectionObserver(
          target,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              updateHashAndActiveItem(item, false)
            }
          },
          {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
          }
        )
      }
    })
  }

  const startHideTimer = () => {
    if (hideTimer) clearTimeout(hideTimer)
    hideTimer = setTimeout(() => {
      if (scrolled.value && !mobileMenuOpen.value && !isHovered.value) {
        isHidden.value = true
      }
    }, THREES_TIMEOUT_BUFFER)
  }

  const resetHideTimer = () => {
    if (hideTimer) clearTimeout(hideTimer)
    isHidden.value = false
    if (scrolled.value) {
      startHideTimer()
    }
  }

  const handleMouseEnter = () => {
    isHovered.value = true
    isHidden.value = false
    if (hideTimer) clearTimeout(hideTimer)
  }

  const handleMouseLeave = () => {
    isHovered.value = false
    if (scrolled.value) {
      startHideTimer()
    }
  }

  watch(scrollY, (newScrollY, oldScrollY) => {
    if (newScrollY !== oldScrollY) {
      resetHideTimer()
    }
  })

  onMounted(() => {
    setupIntersectionObservers()
    window.addEventListener('scroll', resetHideTimer)
  })

  onUnmounted(() => {
    if (hideTimer) clearTimeout(hideTimer)
    window.removeEventListener('scroll', resetHideTimer)
  })

  return {
    scrolled,
    mobileMenuOpen,
    isHidden,
    isHovered,
    activeItem,
    updateHashAndActiveItem,
    toggleMobileMenu,
    handleMouseEnter,
    handleMouseLeave
  }
}
