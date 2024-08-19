import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import BackgroundSelector from "./backgrounds/BackgroundSelector"
import ChangeLayout from "./ChangeLayout"

export default function Appearance() {
  return (
    <div className="flex flex-col gap-4">
      <ChangeLayout />
      <Accordion type="multiple">
        <AccordionItem value="background">
          <AccordionTrigger>Background</AccordionTrigger>
          <AccordionContent className="px-1 pt-1">
            <BackgroundSelector />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
