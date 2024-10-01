export function isValidUrl(url: string) {
  // Remove leading/trailing whitespace
  url = url.trim()

  // Regular expression for URL validation
  const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([/?].*)?$/

  // Test the URL against the pattern
  if (!urlPattern.test(url)) {
    return false
  }

  // If there's no protocol, prepend https://
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url
  }

  try {
    // Attempt to create a URL object
    new URL(url)
    return true // Return the formatted URL string
  } catch (error) {
    return false
  }
}

export function hasProtocol(url: string) {
  return /^https?:\/\//i.test(url)
}
