import { z } from "zod"
import { useFormStep } from "@/lib/hooks/use-form-step"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Updated Ethical Preferences Schema
const ethicalPreferencesSchema = z.discriminatedUnion("hasPreferences", [
  // When specific preferences are selected
  z.object({
    hasPreferences: z.literal(true),
    ethicalPreferences: z.array(
      z.enum([
        "VEGAN", 
        "CRUELTY_FREE", 
        "SUSTAINABLE_PACKAGING", 
        "REEF_SAFE", 
        "PALM_OIL_FREE"
      ])
    ).min(1, "Select at least one ethical preference")
  }),
  
  // When no preferences are selected
  z.object({
    hasPreferences: z.literal(false),
    ethicalPreferences: z.undefined()
  })
])

type EthicalPreferencesForm = z.infer<typeof ethicalPreferencesSchema>

export function EthicalPreferences({step}: {step: number}) {
  const { form, handleBack, handleNext } = useFormStep<EthicalPreferencesForm>({
    schema: ethicalPreferencesSchema,
    currentStep: step,
  })

  const ethicalPreferencesOptions = [
    { 
      value: "VEGAN", 
      label: "Vegan", 
      description: "No animal-derived ingredients" 
    },
    { 
      value: "CRUELTY_FREE", 
      label: "Cruelty-Free", 
      description: "No animal testing" 
    },
    { 
      value: "SUSTAINABLE_PACKAGING", 
      label: "Sustainable Packaging", 
      description: "Environmentally friendly packaging" 
    },
    { 
      value: "REEF_SAFE", 
      label: "Reef Safe", 
      description: "Environmentally conscious marine protection" 
    },
    { 
      value: "PALM_OIL_FREE", 
      label: "Palm Oil Free", 
      description: "Avoiding palm oil to protect rainforests" 
    }
  ]

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Ethical Preferences</CardTitle>
        <CardDescription>
          Select your ethical priorities for skincare products.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            {/* Preferences Selection */}
            <FormField
              control={form.control}
              name="hasPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        const boolValue = value === 'true'
                        field.onChange(boolValue)
                        
                        // Reset or clear ethical preferences based on selection
                        if (!boolValue) {
                          form.setValue("ethicalPreferences", undefined)
                        }
                      }}
                      defaultValue={field.value?.toString()}
                      className="space-y-4"
                    >
                      <FormItem className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <Label className="flex flex-col cursor-pointer">
                          <span className="font-semibold">I have specific ethical preferences</span>
                          <span className="font-normal text-muted-foreground">
                            Select if you want to filter products by ethical criteria
                          </span>
                        </Label>
                      </FormItem>
                      
                      <FormItem className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <Label className="flex flex-col cursor-pointer">
                          <span className="font-semibold">I have no specific preferences</span>
                          <span className="font-normal text-muted-foreground">
                            Continue without applying ethical filters
                          </span>
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Ethical Preferences Selection */}
            {form.watch("hasPreferences") === true && (
              <FormField
                control={form.control}
                name="ethicalPreferences"
                render={() => (
                  <FormItem>
                    <CardTitle className="mb-4">Select Ethical Priorities</CardTitle>
                    <div className="space-y-4">
                      {ethicalPreferencesOptions.map((option) => (
                        <FormField
                          key={option.value}
                          control={form.control}
                          name="ethicalPreferences"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.value}
                                className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.value as "CRUELTY_FREE" | "VEGAN" | "SUSTAINABLE_PACKAGING" | "REEF_SAFE" | "PALM_OIL_FREE")}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), option.value])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== option.value
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <Label className="flex flex-col cursor-pointer">
                                  <span className="font-semibold">{option.label}</span>
                                  <span className="font-normal text-muted-foreground">
                                    {option.description}
                                  </span>
                                </Label>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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

export default EthicalPreferences