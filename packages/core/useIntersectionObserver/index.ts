import { Ref, watchEffect } from 'vue-demi'

interface IntersectionObserverProps {
  target: Ref<Element|null|undefined>
  onIntersect: IntersectionObserverCallback
  root?: Ref<Element|null|undefined>
  rootMargin?: string
  threshold?: number
}

export function useIntersectionObserver({
  target,
  onIntersect,
  root,
  rootMargin = '0px',
  threshold = 0.1,
}: IntersectionObserverProps) {
  let cleanup = () => {}

  const stopEffect = watchEffect(() => {
    cleanup()

    const observer = new IntersectionObserver(onIntersect, {
      root: root?.value,
      rootMargin,
      threshold,
    })

    const current = target.value

    current && observer.observe(current)

    cleanup = () => {
      observer.disconnect()
    }
  })

  return () => {
    cleanup()
    stopEffect()
  }
}
