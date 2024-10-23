import { LucideIcon } from "lucide-react"
import { lazy, Suspense } from "react"

const loadIcon = (name: string) => {
  try {
    return lazy(() => import(`../iconDir/icons/${name}.js`).then((module) => ({ default: module.default })))
  } catch (error) {
    console.error(`Failed to load icon ${name}`, error)
    return null
  }
}

const fallback = <div className="h-10 w-10 animate-pulse rounded border"></div>

export default function LucideRender({
  name,
  className,
  style,
}: {
  name: string
  className?: string
  style?: React.CSSProperties
}) {
  if (!name || name.trim().length == 0) return <></>
  const IconComponent = loadIcon(name) as LucideIcon
  if (!IconComponent) return <></>

  return (
    <Suspense fallback={fallback}>
      <IconComponent style={style} className={className} />
    </Suspense>
  )
}
