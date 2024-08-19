import ConnectionWrapper from "@/ConnectionWrapper"

export default function ImageDisplay({ url, className }: { url: string; className?: string }) {
  const handleCantLoad = (e) => {
    e.target.src = "./Icons/externalLink.png"
  }
  return (
    <img
      className={className}
      src={`https://www.google.com/s2/favicons?domain=${url}&sz=32`}
      onError={handleCantLoad}
      alt={`Shortcut icon`}
    />
  )
}
