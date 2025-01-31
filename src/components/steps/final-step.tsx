import { useFormStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormStep } from "@/lib/hooks/use-form-step"
import { z } from "zod"

import LeadForm from "../lead-form"
import SkincareSummary from "../skincare-summary"
import DeveloperProfile from "../developer-profile"
import { SkincareSummarySheet } from "../skincare-sheet"


function FinalStep({step}: {step: number}) {
  const { formData, resetForm, setCurrentStep } = useFormStore()

  const {handleBack} = useFormStep({
    currentStep: step,
    schema: z.object({}),

  })



  const handleReset = () => {
    resetForm()
    setCurrentStep(1)
  }


  return (
    <div className="space-y-6 p-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Review Your Complete Skincare Profile</CardTitle>
          <CardDescription>
            Please review all the information you've provided. You can edit or start over.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <SkincareSummarySheet data={formData} />
          </div>
          <SkincareSummary data={formData}></SkincareSummary>
          <LeadForm></LeadForm>
          <DeveloperProfile></DeveloperProfile>           

        </CardContent>
        <CardFooter className="flex justify-between">
          <Button back variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleReset}>Start Over</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default FinalStep