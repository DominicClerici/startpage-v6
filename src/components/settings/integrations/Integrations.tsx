import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SpotifySettings from "./SpotifySettings"
import LifxSettings from "./lifx/LifxSettings"

export const SpotifyIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
)

export const LifxIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 209 254">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M209 104.5C209 137.997 193.24 167.812 168.73 186.936C152.092 170.878 129.45 161 104.5 161C79.5504 161 56.9078 170.878 40.2698 186.936C15.7601 167.812 0 137.997 0 104.5C0 46.7863 46.7863 0 104.5 0C162.214 0 209 46.7863 209 104.5ZM185 104.5C185 124.074 178.014 142.016 166.399 155.97C148.508 144.591 127.273 138 104.5 138C81.7265 138 60.4924 144.591 42.6012 155.97C30.9862 142.016 24 124.074 24 104.5C24 60.0411 60.0411 24 104.5 24C148.959 24 185 60.0411 185 104.5Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M122.39 236.313C117.499 232.364 111.275 230 104.5 230C98.0331 230 92.0692 232.154 87.2866 235.784L105.103 253.6L122.39 236.313Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M138.047 219.424L152.927 204.545C140.089 193.015 123.114 186 104.5 186C85.8431 186 68.8322 193.047 55.9839 204.625L70.8616 219.503C79.8856 211.712 91.6426 207 104.5 207C117.314 207 129.035 211.68 138.047 219.424Z"
    />
  </svg>
)

export default function Integrations() {
  return (
    <Accordion type="multiple" defaultValue={["lifx"]}>
      <AccordionItem value="spotify">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <SpotifyIcon className="h-5 w-5 fill-foreground" />
            Spotify
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-1">
          <SpotifySettings />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="lifx">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <LifxIcon className="h-5 w-5 fill-foreground" />
            LIFX
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-1">
          <LifxSettings />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
