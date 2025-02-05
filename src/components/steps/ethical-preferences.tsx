import { z } from "zod"
import { useFormStep } from "@/hooks/use-form-step"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { RadioGroup } from "@/components/ui/radio-group"
import { motion, AnimatePresence } from "framer-motion"

// Updated Ethical Preferences Schema
const ethicalPreferencesSchema = z.discriminatedUnion("hasPreferencesEthical", [
  // When specific preferences are selected
  z.object({
    hasPreferencesEthical: z.literal(true),
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
    hasPreferencesEthical: z.literal(false),
    ethicalPreferences: z.any()
  })
])


export function EthicalPreferences({step}: {step: number}) {
  const { form, handleBack, handleNext } = useFormStep({
    schema: ethicalPreferencesSchema,
    currentStep: step,
  })

  const ethicalPreferencesOptions = [
    { 
      value: "VEGAN", 
      label: "Vegan", 
      description: "No animal-derived ingredients",
      icon: "🌱"
    },
    { 
      value: "CRUELTY_FREE", 
      label: "Cruelty-Free", 
      description: "No animal testing",
      icon: "🐇"
    },
    { 
      value: "SUSTAINABLE_PACKAGING", 
      label: "Sustainable Packaging", 
      description: "Environmentally friendly packaging",
      icon: "📦"
    },
    { 
      value: "REEF_SAFE", 
      label: "Reef Safe", 
      description: "Environmentally conscious marine protection",
      icon: "🐠"
    },
    { 
      value: "PALM_OIL_FREE", 
      label: "Palm Oil Free", 
      description: "Avoiding palm oil to protect rainforests",
      icon: "🌴"
    }
  ]

  return (
    <Card>
      <CardHeader className="text-left md:text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CardTitle >
            Ethical Preferences
          </CardTitle>
          <CardDescription >
            Select your ethical priorities for skincare products
          </CardDescription>
        </motion.div>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-8">
            <FormField
              control={form.control}
              name="hasPreferencesEthical"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        const boolValue = value === 'true'
                        field.onChange(boolValue)
                        if (!boolValue) form.setValue("ethicalPreferences", undefined)
                      }}
                      defaultValue={field.value?.toString()}
                      className="space-y-4"
                    >
                      {[
                        {
                          value: "true",
                          label: "I have specific preferences",
                          description: "Filter products by ethical criteria"
                        },
                        {
                          value: "false",
                          label: "No specific preferences",
                          description: "Continue without ethical filters"
                        }
                      ].map((option) => (
                        <motion.div
                          key={option.value}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 * Number(option.value === "false") }}
                        >
                          <div 
                            className={`
                              group flex items-center space-x-3 rounded-xl p-6 cursor-pointer
                              border-2 transition-all duration-300 ease-in-out
                              ${
                                field.value?.toString() === option.value
                                ? 'border-primary bg-primary/10 shadow-lg'
                                : 'border-muted hover:border-primary/30 hover:bg-accent/20'
                              }
                            `}
                            onClick={() => field.onChange(option.value === 'true')}
                          >
                            <div className="flex-shrink-0">
                              <div className={`
                                h-6 w-6 rounded-full border-2 flex items-center justify-center
                                ${field.value?.toString() === option.value 
                                  ? 'border-primary bg-primary text-white'
                                  : 'border-muted-foreground group-hover:border-primary'}
                              `}>
                                {field.value?.toString() === option.value && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2 h-2 bg-current rounded-full"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-lg font-semibold cursor-pointer">
                                {option.label}
                              </Label>
                              <p className="text-muted-foreground">{option.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

           
<AnimatePresence>
              {form.watch("hasPreferencesEthical") === true && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-center mb-6">
                    Select Your Priorities
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="ethicalPreferences"
                    render={() => (
                      <FormItem>
                        <div className="grid gap-4 md:grid-cols-2">
                          {ethicalPreferencesOptions.map((option, index) => (
                            <FormField
                              key={option.value}
                              control={form.control}
                              name="ethicalPreferences"
                              render={({ field }) => {
                                const isChecked = field.value?.includes(option.value as any)
                                return (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <div
                                      className={`
                                        relative flex items-start space-x-3 rounded-xl p-4 cursor-pointer
                                        border-2 transition-all duration-300 ease-in-out
                                        ${
                                          isChecked
                                          ? 'border-primary bg-primary/10 shadow-md'
                                          : 'border-muted hover:border-primary/30 hover:bg-accent/20'
                                        }
                                      `}
                                      onClick={() => {
                                        isChecked
                                          ? field.onChange(field.value?.filter((v:any) => v !== option.value))
                                          : field.onChange([...(field.value || []), option.value])
                                      }}
                                    >
                                      <div className="flex-shrink-0">
                                        <div className={`
                                          h-6 w-6 rounded-md border-2 flex items-center justify-center
                                          ${isChecked 
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-muted-foreground'}
                                        `}>
                                          {isChecked && (
                                            <motion.svg
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              className="w-4 h-4"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="3"
                                            >
                                              <path d="M5 13l4 4L19 7" />
                                            </motion.svg>
                                          )}
                                        </div>
                                      </div>
                                      <div className="space-y-1">
                                        <Label className="flex items-center gap-2 text-lg font-medium">
                                          <span>{option.icon}</span>
                                          {option.label}
                                        </Label>
                                        <p className="text-muted-foreground text-sm">
                                          {option.description}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.div>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage className="text-center text-red-500 font-medium" />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="flex justify-between pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                back
              >
                Back
              </Button>
              <Button
                type="submit"
                front
              >
                Continue
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default EthicalPreferences