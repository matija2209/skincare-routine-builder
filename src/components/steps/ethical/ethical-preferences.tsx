import { useFormStep } from "@/lib/hooks/use-form-step"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { RadioGroup } from "@/components/ui/radio-group"
import { motion, AnimatePresence } from "framer-motion"
import { PreferencesGrid } from "./preferences-grid"
import { ethicalPreferencesSchema, type EthicalPreferencesForm } from "./schema"
import { Label } from "@/components/ui/label"

function EthicalPreferences({step}: {step: number}) {
  const { form, handleBack, handleNext } = useFormStep<EthicalPreferencesForm>({
    schema: ethicalPreferencesSchema,
    currentStep: step,
  })

  return (
    <Card className="w-full">
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
                            <RadioButton checked={field.value?.toString() === option.value} />
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
                <PreferencesGrid form={form} />
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
                type="submit" front              >
                Continue
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

function RadioButton({ checked }: { checked: boolean }) {
  return (
    <div className="flex-shrink-0">
      <div className={`
        h-6 w-6 rounded-full border-2 flex items-center justify-center
        ${checked 
          ? 'border-primary bg-primary text-white'
          : 'border-muted-foreground group-hover:border-primary'}
      `}>
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 bg-current rounded-full"
          />
        )}
      </div>
    </div>
  )
}

export default EthicalPreferences