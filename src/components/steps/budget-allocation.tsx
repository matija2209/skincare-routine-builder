import { z } from "zod"
import { useFormStep } from "@/lib/hooks/use-form-step"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Budget Allocation Schema
const budgetAllocationSchema = z.object({
  monthlyBudget: z.enum(["LOW", "MID_RANGE", "LUXURY"], {
    required_error: "Please select your monthly skincare budget"
  })
})

type BudgetAllocationForm = z.infer<typeof budgetAllocationSchema>

export function BudgetAllocation({step}: {step: number}) {
  const { form, handleBack, handleNext } = useFormStep<BudgetAllocationForm>({
    schema: budgetAllocationSchema,
    currentStep: step,
  })

  const budgetOptions = [
    { 
      value: "LOW", 
      label: "Budget-Friendly", 
      description: "Less than $50 per month", 
      range: "<$50/month"
    },
    { 
      value: "MID_RANGE", 
      label: "Mid-Range", 
      description: "Balanced investment in skincare", 
      range: "$50-$150/month"
    },
    { 
      value: "LUXURY", 
      label: "Luxury Skincare", 
      description: "Premium and high-end products", 
      range: "$150+/month"
    }
  ]

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Budget Allocation</CardTitle>
        <CardDescription>
          Select your monthly budget for skincare products to help us tailor recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            <FormField
              control={form.control}
              name="monthlyBudget"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-4"
                    >
                      {budgetOptions.map((option) => (
                        <div 
                          key={option.value} 
                          className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent"
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="flex flex-col cursor-pointer">
                            <div className="flex justify-between items-center w-full">
                              <span className="font-semibold">{option.label}</span>
                              <span className="text-sm text-muted-foreground">
                                {option.range}
                              </span>
                            </div>
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

export default BudgetAllocation