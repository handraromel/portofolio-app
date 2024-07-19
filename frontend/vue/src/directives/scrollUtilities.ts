/**
 * Usage for this directive:
 * ANIMATION
 * <div v-scroll-utilities="{ type: 'animation', animationType: 'slideInRight', duration: 1.5, delay: 0.2, replay: true }" />
 * LAZYLOAD
 * Image:
 * <img v-scroll-utilities="{ type: 'lazyLoad' }" src:'/path/to/image.jpg' alt="Lazy loaded image" />
 */

import { type Directive, watch, onUnmounted } from 'vue'
import { useIntersectionObserver, useWindowScroll } from '@vueuse/core'
import gsap from 'gsap'

interface ScrollUtilitiesOptions {
  type: 'animation' | 'lazyLoad'
  animationType?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'zoomIn'
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
  replay?: boolean
}

type AnimationFunction = (el: HTMLElement, options: ScrollUtilitiesOptions) => gsap.TweenVars

const animations: Record<string, AnimationFunction> = {
  fadeIn: (el, options) => ({
    opacity: 1,
    duration: options.duration || 1,
    delay: options.delay || 0,
    ease: options.ease || 'power2.out'
  }),
  slideUp: (el, options) => ({
    opacity: 1,
    y: 0,
    duration: options.duration || 1,
    delay: options.delay || 0,
    ease: options.ease || 'power3.out'
  }),
  slideInLeft: (el, options) => ({
    opacity: 1,
    x: 0,
    duration: options.duration || 1,
    delay: options.delay || 0,
    ease: options.ease || 'power2.inOut'
  }),
  slideInRight: (el, options) => ({
    opacity: 1,
    x: 0,
    duration: options.duration || 1,
    delay: options.delay || 0,
    ease: options.ease || 'power2.inOut'
  }),
  zoomIn: (el, options) => ({
    opacity: 1,
    scale: 1,
    duration: options.duration || 1,
    delay: options.delay || 0,
    ease: options.ease || 'power2.out'
  })
}

const setInitialStyles = (element: HTMLElement, animationType?: string) => {
  switch (animationType) {
    case 'slideUp':
      gsap.set(element, { opacity: 0, y: 50 })
      break
    case 'slideInLeft':
      gsap.set(element, { opacity: 0, x: -50 })
      break
    case 'slideInRight':
      gsap.set(element, { opacity: 0, x: 50 })
      break
    case 'zoomIn':
      gsap.set(element, { opacity: 0, scale: 0.95 })
      break
    default:
      gsap.set(element, { opacity: 0 })
  }
}

const vScrollUtilities: Directive<HTMLElement, ScrollUtilitiesOptions> = {
  mounted(el, binding) {
    const options = {
      ...binding.value,
      replay: binding.value?.replay ?? false
    }

    let hasAnimated = false
    let timeline: gsap.core.Timeline | null = null

    const animateElements = () => {
      if (options.type !== 'animation' || !options.animationType) return

      const animationFn = animations[options.animationType]
      if (animationFn) {
        const elements = options.stagger ? Array.from(el.children) : [el]
        timeline = gsap.timeline()

        elements.forEach((element, index) => {
          const animationProps = animationFn(element as HTMLElement, options)
          const delay = options.stagger ? index * (options.stagger || 0.1) : 0

          setInitialStyles(element as HTMLElement, options.animationType)
          timeline!.to(element, { ...animationProps, delay }, delay)
        })
      }
      hasAnimated = true
    }

    const resetAnimation = () => {
      if (timeline) {
        timeline.kill()
      }
      const elements = options.stagger ? Array.from(el.children) : [el]
      elements.forEach((element) => {
        setInitialStyles(element as HTMLElement, options.animationType)
      })
      hasAnimated = false
    }

    if (options.type === 'animation') {
      const elements = options.stagger ? Array.from(el.children) : [el]
      elements.forEach((element) => {
        setInitialStyles(element as HTMLElement, options.animationType)
      })
    }

    const lazyLoadContent = () => {
      if (options.type !== 'lazyLoad') return

      const src = el.getAttribute('data-src')
      if (src) {
        if (el.tagName.toLowerCase() === 'img') {
          ;(el as HTMLImageElement).src = src
        } else {
          el.style.backgroundImage = `url(${src})`
        }
        el.removeAttribute('data-src')
      }
    }

    if (options.type === 'animation') {
      const elements = options.stagger ? Array.from(el.children) : [el]
      elements.forEach((element) => {
        setInitialStyles(element as HTMLElement, options.animationType)
      })
    }

    const { y } = useWindowScroll()

    const { stop } = useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          if (options.type === 'animation' && !hasAnimated) {
            animateElements()
          } else if (options.type === 'lazyLoad') {
            lazyLoadContent()
            stop()
          }
        }
      },
      { threshold: 0.2 }
    )

    let unwatchScroll: (() => void) | null = null

    if (options.type === 'animation' && options.replay) {
      unwatchScroll = watch(y, (newY) => {
        if (newY === 0) {
          resetAnimation()
        }
      })
    }

    onUnmounted(() => {
      stop()
      if (unwatchScroll) {
        unwatchScroll()
      }
    })
  }
}

export default vScrollUtilities
