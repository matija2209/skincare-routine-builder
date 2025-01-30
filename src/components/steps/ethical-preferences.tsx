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
      <CardHeader className="text-left md:text-center">
        <CardTitle className="text-4xl font-bold">Ethical Preferences</CardTitle>
        <CardDescription className="text-lg max-w-2xl mx-auto">
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
                      {[
                        {
                          value: "true",
                          label: "I have specific ethical preferences",
                          description: "Select if you want to filter products by ethical criteria"
                        },
                        {
                          value: "false",
                          label: "I have no specific preferences",
                          description: "Continue without applying ethical filters"
                        }
                      ].map((option) => (
                        <div 
                          key={option.value}
                          className={`
                            flex items-center space-x-3 rounded-lg border p-4 cursor-pointer
                            transition-all duration-300 ease-in-out
                            ${field.value?.toString() === option.value 
                              ? 'bg-primary/5 border-primary ring-2 ring-primary' 
                              : 'hover:bg-accent/50'}
                          `}
                          onClick={() => {
                            const boolValue = option.value === 'true'
                            field.onChange(boolValue)
                            
                            // Reset or clear ethical preferences based on selection
                            if (!boolValue) {
                              form.setValue("ethicalPreferences", undefined)
                            }
                          }}
                        >
                          <RadioGroupItem 
                            value={option.value} 
                            className={`
                              ${field.value?.toString() === option.value 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-transparent'}
                            `}
                          />
                          <Label className="flex flex-col cursor-pointer">
                            <span className="font-semibold">{option.label}</span>
                            <span className="font-normal text-muted-foreground">
                              {option.description}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
                     {form.watch("hasPreferences") === true &&<CardTitle className="text-2xl mb-4">Select Ethical Priorities</CardTitle>}

            {/* Ethical Preferences Selection */}
            {form.watch("hasPreferences") === true && (
              <FormField
                control={form.control}
                name="ethicalPreferences"
                render={() => (
                  <FormItem>
                    <div className="space-y-4">
                      {ethicalPreferencesOptions.map((option) => (
                        <FormField
                          key={option.value}
                          control={form.control}
                          name="ethicalPreferences"
                          render={({ field }) => {
                            const isChecked = field.value?.includes(option.value as "CRUELTY_FREE" | "VEGAN" | "SUSTAINABLE_PACKAGING" | "REEF_SAFE" | "PALM_OIL_FREE")
                            return (
                              <div
                                key={option.value}
                                className={`
                                  flex items-center space-x-3 rounded-lg border p-4 cursor-pointer
                                  transition-all duration-300 ease-in-out
                                  ${isChecked 
                                    ? 'bg-primary/5 border-primary ring-2 ring-primary' 
                                    : 'hover:bg-accent/50'}
                                `}
                                onClick={() => {
                                  return isChecked
                                    ? field.onChange(
                                        field.value?.filter(
                                          (value) => value !== option.value
                                        )
                                      )
                                    : field.onChange([...(field.value || []), option.value])
                                }}
                              >
                                <Checkbox
                                  checked={isChecked}
                                  className={`
                                    ${isChecked 
                                      ? 'border-primary bg-primary text-primary-foreground' 
                                      : ''}
                                  `}
                                />
                                <Label className="flex flex-col cursor-pointer">
                                  <span className="font-semibold">{option.label}</span>
                                  <span className="font-normal text-muted-foreground">
                                    {option.description}
                                  </span>
                                </Label>
                              </div>
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