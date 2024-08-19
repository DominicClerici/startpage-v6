export default function formatDate(date: Date): string {
  const now = new Date()
  const diffInMilliseconds = date.getTime() - now.getTime()
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays >= 1 && diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""}`
  } else if (diffInHours >= 1 && diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""}`
  } else if (diffInMinutes >= 1 && diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`
  } else if (diffInMinutes < 1) {
    return "Past due"
  }

  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}
