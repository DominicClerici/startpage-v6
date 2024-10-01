import { InfoIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export default function Updater() {
  const [needsUpdate, setNeedsUpdate] = useState(true)
  //   useEffect(() => {
  //     const manifest = chrome.runtime.getManifest()

  //     fetch("https://www.usespringtab.com/api/update")
  //       .then((res) => {
  //         return res.json()
  //       })
  //       .then((data) => {
  //         if (data.version !== manifest.version) {
  //           setNeedsUpdate(true)
  //         }
  //       })
  //   }, [])

  return (
    <div className="fixed">
      {needsUpdate && (
        <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
          <InfoIcon className="h-6 w-6" />
          <p className="text-lg">A new version of Spring Tab is available.</p>
          <Button onClick={() => chrome.runtime.reload()}>Update</Button>
        </div>
      )}
    </div>
  )
}
