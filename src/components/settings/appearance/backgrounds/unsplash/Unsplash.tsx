import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { UnsplashBackgroundContext } from "@/context/appearance/BackgroundSettings"
import {
  ChevronLeft,
  ChevronRight,
  CloudSunIcon,
  CpuIcon,
  DropletIcon,
  GripIcon,
  InfoIcon,
  LeafIcon,
  SquareIcon,
  TriangleAlertIcon,
  UserIcon,
} from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Blurhash } from "react-blurhash"

const ORIGIN = "https://www.usespringtab.com/api/unsplash"

export default function Unsplash() {
  const [pageNumber, setPageNumber] = useState(1)
  const [photoList, setPhotoList] = useState(null)
  const [currentCategory, setCurrentCategory] = useState("all")
  const { unsplashBackground, setUnsplashBackground } = useContext(UnsplashBackgroundContext)

  useEffect(() => {
    getPhotos("all").then((data) => {
      setPhotoList(data)
    })
  }, [])

  const getPhotos = async (category: string) => {
    const res = await fetch(`${ORIGIN}/list_photos?collection=${category}`)
    if (res.status === 200) {
      const data = await res.json()
      return data
    }
    return {
      error: "Failed to fetch photos",
    }
  }

  const searchPhotos = async (query: string) => {
    const res = await fetch(`${ORIGIN}/list_photos?search=${query}`)
    if (res.status === 200) {
      const data = await res.json()
      setCurrentCategory("all")
      setPhotoList({ data: data.data.results })
    } else {
      setPhotoList({
        error: "Failed to fetch photos",
      })
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Unsplash</CardTitle>
        <CardDescription>Choose from a collection of high-quality photos from Unsplash</CardDescription>
        <div className="mb-2 flex items-center gap-4">
          <Select
            value={currentCategory}
            onValueChange={(e) => {
              setCurrentCategory(e)
              getPhotos(e).then((data) => {
                setPhotoList(data)
              })
            }}
          >
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="1319040">
                <span className="flex items-center gap-2">
                  <LeafIcon className="h-4 w-4" />
                  Nature
                </span>
              </SelectItem>
              <SelectItem value="627563">
                <span className="flex items-center gap-2">
                  <DropletIcon className="h-4 w-4" />
                  Ocean
                </span>
              </SelectItem>
              <SelectItem value="627562">
                <span className="flex items-center gap-2">
                  <CloudSunIcon className="h-4 w-4" />
                  Sky
                </span>
              </SelectItem>
              <SelectItem value="1817672">
                <span className="flex items-center gap-2">
                  <SquareIcon className="h-4 w-4" />
                  Shapes
                </span>
              </SelectItem>
              <SelectItem value="4979360">
                <span className="flex items-center gap-2">
                  <GripIcon className="h-4 w-4" />
                  Patterns
                </span>
              </SelectItem>
              <SelectItem value="He87uFs-2zg">
                <span className="flex items-center gap-2">
                  <CpuIcon className="h-4 w-4" />
                  Cyberpunk
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
          <Input
            onKeyDown={(e) => {
              if (e.currentTarget.value.trim() !== "") {
                if (e.key === "Enter") {
                  searchPhotos(e.currentTarget.value)
                }
              }
            }}
            onBlur={(e) => {
              if (e.currentTarget.value.trim() !== "") {
                searchPhotos(e.currentTarget.value)
              }
            }}
            placeholder="Search..."
          />
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        {photoList ? (
          photoList.error ? (
            <div className="flex items-center gap-4 rounded-md border p-4 text-xl text-muted-foreground">
              <TriangleAlertIcon className="h-6 w-6" />
              {photoList.error}
            </div>
          ) : (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <p className="text-lg">
                  Page {pageNumber} of {Math.ceil(photoList.data.length / 6)}
                </p>
                <Button
                  variant="outline"
                  className="ml-auto"
                  onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPageNumber((prev) => Math.min(Math.ceil(photoList.data.length / 6), prev + 1))}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {photoList.data.slice((pageNumber - 1) * 6, (pageNumber - 1) * 6 + 6).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.id === unsplashBackground.id) return
                      setUnsplashBackground({
                        id: item.id,
                        photo: item.urls.full,
                        publisher: item.user.name,
                        link: item.user.links.html,
                        blurhash: item.blur_hash,
                      })
                    }}
                    className={`group relative h-32 overflow-hidden rounded-md border ${item.id === unsplashBackground.id ? "border-2 border-primary" : "cursor-pointer"}`}
                  >
                    <ImageBlurHashPreview hash={item.blur_hash} alt={item.alt_description} url={item.urls.small} />
                    <div className="absolute bottom-0 left-0 w-full border-t bg-card/80 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <a
                        href={item.user.links.html}
                        target="_blank"
                        className="line-clamp-1 flex items-center gap-1 text-xs font-light text-card-foreground hover:underline"
                      >
                        <UserIcon className="h-3 w-3" />
                        {item.user.name}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="flex items-center gap-4 rounded-md border p-4 text-xl text-muted-foreground">
            <InfoIcon className="h-6 w-6" />
            Loading...
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const ImageBlurHashPreview = ({ hash, alt, url }: { hash: string; alt: string; url: string }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {hash && <Blurhash className="opacity" hash={hash} width={"100%"} height={"100%"} />}
      <img
        src={url}
        alt={alt}
        className={`absolute left-0 top-0 max-h-32 w-full object-cover object-center transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}
