import Loading from "../../lib/Loading"

export default function Loader() {
  return (
    <div className="flex h-[400px] w-[402px] items-center justify-center">
      <Loading className="h-24 w-24 text-muted-foreground" />
    </div>
  )
}
