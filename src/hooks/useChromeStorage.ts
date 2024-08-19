import { useEffect, useRef, useState } from "react"

const useChromeStorage = <T>(key: string, initialValue: T) => {
  const [data, setData] = useState<T>(initialValue)
  const debounceUpdate = useRef<null | NodeJS.Timeout>(null)
  const originalData = useRef<null | T>(null)

  const storage = chrome.storage

  useEffect(() => {
    if (storage) {
      storage.sync.get([key], (result) => {
        // If the data exists, use it. Otherwise, set the default value.
        if (chrome.runtime.lastError) {
          // ! ADD ERROR HANDLING HERE
          console.error(`Error getting ${key}:, ${chrome.runtime.lastError}`)
          return
        }

        if (result[key] !== undefined) {
          setData(result[key])
        } else {
          storage.sync.set({ [key]: initialValue }, () => {
            if (chrome.runtime.lastError) {
              // ! ADD ERROR HANDLING HERE
              console.error(`Error setting ${key}:, ${chrome.runtime.lastError}`)
              return
            }
            setData(initialValue)
          })
        }
        // Try fetching the data from Chrome storage
      })
    }
  }, [key, initialValue])

  const updateData = (newValue: T | ((prevValue: T) => T)) => {
    console.log("began update", key)
    if (debounceUpdate.current) {
      clearTimeout(debounceUpdate.current)
    } else {
      originalData.current = data
    }

    const valueToStore = newValue instanceof Function ? newValue(data) : newValue

    console.log("called setstate")
    setData(valueToStore)

    debounceUpdate.current = setTimeout(() => {
      console.log("Setting in storage")
      storage.sync.set({ [key]: valueToStore }, () => {
        if (chrome.runtime.lastError) {
          console.error(`Error getting ${key}:, ${chrome.runtime.lastError}`)
          if (originalData.current !== null) {
            setData(originalData.current)
          }
          return
        }
        debounceUpdate.current = null
      })
    }, 1000)
  }
  if (storage === undefined) {
    return [data, setData] as const
  }
  return [data, updateData] as const
}

export default useChromeStorage
