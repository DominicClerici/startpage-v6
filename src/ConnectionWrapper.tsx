import React, { useState, useEffect, ReactNode } from "react"

interface ConnectionWrapperProps {
  children: ReactNode
  fallback: ReactNode
}

const ConnectionWrapper: React.FC<ConnectionWrapperProps> = ({ children, fallback }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!isOnline) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export default ConnectionWrapper
