import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatSkincareDataToText } from "@/utils/formatSkincareDataToText"
import { SkincareFormData } from "@/types/global"

interface SkincareSummarySheetProps {
  data: SkincareFormData
}

export function SkincareSummarySheet({ data }: SkincareSummarySheetProps) {
  const formattedText = formatSkincareDataToText(data)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button front >View Text Summary</Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>Skincare Profile Summary</SheetTitle>
          <SheetDescription>
            A detailed text summary of your skincare profile
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[80vh] mt-4">
          <pre className="whitespace-pre-wrap font-mono text-sm p-4 bg-muted rounded-lg">
            {formattedText}
          </pre>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
} 