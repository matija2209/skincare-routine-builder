import { useFormStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormStep } from "@/lib/hooks/use-form-step"
import { z } from "zod"


// Expanded mapping functions for readable labels
const mapEnumToLabel = {
  // Skin Type
  skinType: {
    OILY: "Oily",
    DRY: "Dry",
    COMBINATION: "Combination",
    NORMAL: "Normal",
    SENSITIVE: "Sensitive"
  },

  // Skin Goals
  primaryGoal: {
    ANTI_AGING: "Anti-Aging",
    ACNE: "Acne Control",
    HYDRATION: "Hydration Boost",
    BRIGHTENING: "Brightening/Even Tone",
    PORE_MINIMIZATION: "Pore Minimization"
  },

  // Age Group
  ageGroup: {
    TEENS: "Teens (13-19)",
    TWENTIES: "20s",
    THIRTIES: "30s",
    FORTIES: "40s",
    FIFTIES: "50s",
    SIXTIES_PLUS: "60s and above"
  },

  // Environmental Factors
  environmentalFactors: {
    HUMID: "Humid",
    DRY: "Dry",
    POLLUTED: "Polluted",
    TEMPERATE: "Temperate"
  },

  // Lifestyle Factors
  sunExposure: {
    RARE: "Rare Sun Exposure",
    MODERATE: "Moderate Sun Exposure",
    FREQUENT: "Frequent Sun Exposure"
  },
  stressLevels: {
    LOW: "Low Stress",
    MEDIUM: "Medium Stress", 
    HIGH: "High Stress"
  },
  sleepPatterns: {
    LESS_THAN_6_HRS: "Less than 6 hours",
    "6_TO_8_HRS": "6-8 hours",
    MORE_THAN_8_HRS: "More than 8 hours"
  },

  // Exfoliation
  exfoliationFrequency: {
    NEVER: "Never",
    WEEKLY: "Weekly",
    TWO_TO_THREE_TIMES_WEEK: "2-3 times a week"
  },

  // Routine Complexity
  routineComplexity: {
    MINIMAL: "Minimal Routine",
    MODERATE: "Moderate Routine",
    COMPREHENSIVE: "Comprehensive Routine"
  },

  // Budget
  monthlyBudget: {
    LOW: "Budget-Friendly",
    MID_RANGE: "Mid-Range",
    LUXURY: "Luxury Skincare"
  }
}

export function FinalStep({step}: {step: number}) {
  const { formData, resetForm, setCurrentStep } = useFormStore()

  const {handleBack} = useFormStep({
    currentStep: step,
    schema: z.object({}),

  })

  const renderValue = (key: string, value: any) => {
    // Handle array values
    if (Array.isArray(value)) {
      return value.map((v, index) => 
        <span key={index} className="mr-2 bg-muted px-2 py-1 rounded text-sm">
          {/* @ts-ignore */}
          {mapEnumToLabel[key]?.[v] || v}
        </span>
      )
    }
    
    // Handle enum mappings
    // @ts-ignore
    return mapEnumToLabel[key]?.[value] || value
  }

  const renderSection = (sectionTitle: string, sectionData: object) => {
    if (!sectionData) return null

    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{sectionTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(sectionData).map(([key, value]) => (
            <div 
              key={key} 
              className="flex justify-between items-center border-b py-2 last:border-b-0"
            >
              <span className="font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </span>
              <span className="text-muted-foreground">
                {renderValue(key, value)}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  const handleReset = () => {
    resetForm()
    setCurrentStep(1)
  }



  return (
    <div className="container mx-auto max-w-2xl space-y-6 p-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Review Your Complete Skincare Profile</CardTitle>
          <CardDescription>
            Please review all the information you've provided. You can edit or start over.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-sm text-muted-foreground">
              <pre className="bg-muted p-4 rounded-lg">
                {JSON.stringify(formData, null, 2)}
              </pre>

            </div>
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