import { type Directive, type DirectiveBinding, watch, onUnmounted } from 'vue'
import { useIntersectionObserver, useWindowScroll } from '@vueuse/core'
import gsap from 'gsap'

interface GSAPScrollAnimationOptions {
  animationType: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'zoomIn'
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
  replay?: boolean
}

const animations = {
  fadeIn: (el: HTMLElement, options: GSAPScrollAnimationOptions) => {
    return {
      opacity: 1,
      duration: options.duration || 1,
      delay: options.delay || 0,
      ease: options.ease || 'power2.out'
    }
  },
  slideUp: (el: HTMLElement, options: GSAPScrollAnimationOptions) => {
    return {
      opacity: 1,
      y: 0,
      duration: options.duration || 1,
      delay: options.delay || 0,
      ease: options.ease || 'power3.out'
    }
  },
  slideInLeft: (el: HTMLElement, options: GSAPScrollAnimationOptions) => {
    return {
      opacity: 1,
      x: 0,
      duration: options.duration || 1,
      delay: options.delay || 0,
      ease: options.ease || 'power2.inOut'
    }
  },
  slideInRight: (el: HTMLElement, options: GSAPScrollAnimationOptions) => {
    return {
      opacity: 1,
      x: 0,
      duration: options.duration || 1,
      delay: options.delay || 0,
      ease: options.ease || 'power2.inOut'
    }
  },
  zoomIn: (el: HTMLElement, options: GSAPScrollAnimationOptions) => {
    return {
      opacity: 1,
      scale: 1,
      duration: options.duration || 1,
      delay: options.delay || 0,
      ease: options.ease || 'power2.out'
    }
  }
}

const vScrollAnimation: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<GSAPScrollAnimationOptions>) {
    const options = {
      ...binding.value,
      replay: binding.value?.replay ?? false // Default to false if not specified
    }
    let hasAnimated = false
    let timeline: gsap.core.Timeline | null = null

    const setInitialStyles = (element: HTMLElement) => {
      if (options.animationType === 'slideUp') {
        gsap.set(element, { opacity: 0, y: 50 })
      } else if (options.animationType === 'slideInLeft') {
        gsap.set(element, { opacity: 0, x: -50 })
      } else if (options.animationType === 'slideInRight') {
        gsap.set(element, { opacity: 0, x: 50 })
      } else if (options.animationType === 'zoomIn') {
        gsap.set(element, { opacity: 0, scale: 0.95 })
      } else {
        gsap.set(element, { opacity: 0 })
      }
    }

    const animateElements = () => {
      const animationFn = animations[options.animationType]
      if (animationFn) {
        const elements = options.stagger ? Array.from(el.children) : [el]
        timeline = gsap.timeline()

        elements.forEach((element, index) => {
          const animationProps = animationFn(element as HTMLElement, options)
          const delay = options.stagger ? index * (options.stagger || 0.1) : 0

          setInitialStyles(element as HTMLElement)
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
        setInitialStyles(element as HTMLElement)
      })
      hasAnimated = false
    }

    const elements = options.stagger ? Array.from(el.children) : [el]
    elements.forEach((element) => {
      setInitialStyles(element as HTMLElement)
    })

    const { y } = useWindowScroll()

    const { stop } = useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        if (isIntersecting && !hasAnimated) {
          animateElements()
        }
      },
      { threshold: 0.2 }
    )

    let unwatchScroll: (() => void) | null = null

    if (options.replay) {
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

export default vScrollAnimation
