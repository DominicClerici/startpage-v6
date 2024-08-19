import { useEffect, useState } from "react"

export default function AnimateUnmount({
  active,
  children,
  animationOpen = "slideFadeInFromTop",
  animationClose = "slideFadeOutToTop",
  openDuration = "300ms",
  closeDuration = "150ms",
}: {
  active: boolean
  children: React.ReactNode
  animationOpen?: string
  animationClose?: string
  openDuration?: string
  closeDuration?: string
}) {
  const [shouldShow, setShouldShow] = useState(active)

  useEffect(() => {
    if (active) setShouldShow(true)
  }, [active])

  const onAnimationEnd = () => {
    if (!active) setShouldShow(false)
  }
  return (
    shouldShow && (
      <div
        style={{
          animation: `${active ? `${animationOpen} ${openDuration} forwards` : `${animationClose} ${closeDuration} forwards`}`,
        }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  )
}
