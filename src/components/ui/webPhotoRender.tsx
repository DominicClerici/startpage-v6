export default function WebPhotoRender({
  url,
  className,
  size = 32,
}: {
  url: string
  className?: string
  size?: number
}) {
  const handleCantLoad = (e) => {
    e.target.src = "./Icons/externalLink.png"
  }
  return (
    <img
      className={className}
      src={`https://www.google.com/s2/favicons?domain=${url}&sz=${size}`}
      onError={handleCantLoad}
      alt={`Shortcut icon`}
    />
  )
}
