import { z } from "zod"
import { useFormStep } from "@/lib/hooks/use-form-step"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Routine Complexity Schema
const routineComplexitySchema = z.object({
  routineComplexity: z.enum(["MINIMAL", "MODERATE", "COMPREHENSIVE"], {
    required_error: "Please select your preferred routine complexity"
  })
})

type RoutineComplexityForm = z.infer<typeof routineComplexitySchema>

export function RoutineComplexity({step}: {step: number}) {
  const { form, handleBack, handleNext } = useFormStep<RoutineComplexityForm>({
    schema: routineComplexitySchema,
    currentStep: step,
  })

  const routineComplexityOptions = [
    { 
      value: "MINIMAL", 
      label: "Minimal Routine", 
      description: "1-3 steps, quick and simple" 
    },
    { 
      value: "MODERATE", 
      label: "Moderate Routine", 
      description: "4-6 steps, balanced approach" 
    },
    { 
      value: "COMPREHENSIVE", 
      label: "Comprehensive Routine", 
      description: "7+ steps, in-depth skincare" 
    }
  ]

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Routine Complexity</CardTitle>
        <CardDescription>
          Choose the level of complexity you're comfortable with in your skincare routine.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            <FormField
              control={form.control}
              name="routineComplexity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-4"
                    >
                      {routineComplexityOptions.map((option) => (
                        <div 
                          key={option.value} 
                          className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent"
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="flex flex-col cursor-pointer">
                            <span className="font-semibold">{option.label}</span>
                            <span className="font-normal text-muted-foreground">
                              {option.description}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default RoutineComplexity