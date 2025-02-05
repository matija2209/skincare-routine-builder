import { useEffect } from 'react';
import { z } from "zod"
import { useFormStep } from "@/hooks/use-form-step"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Cloud, Sun, Building2 } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const climateTypesSchema = z.object({
  climateType: z.enum(["ARID", "HUMID", "URBAN"], {
    required_error: "Please select an environmental factor",
  })
})

const environmentalOptions = [
  { 
    value: "ARID", 
    label: "Arid Climate", 
    description: "Dry, low humidity environment",
    icon: Sun,
    imageUrl: "https://www.thenatureofcities.com/TNOC/wp-content/uploads/2019/01/Wadi-Hanifa-restoration2.jpg",
    effects: ["Skin dehydration", "Increased sensitivity", "Premature aging"],
    recommendations: ["Deep hydration", "Moisture barrier support"]
  },
  { 
    value: "HUMID", 
    label: "Humid Climate", 
    description: "High moisture, tropical-like conditions",
    icon: Cloud,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDFis2XLc3CSgavIJpGObaDKuh5-LAror08Q&s",
    effects: ["Excess oil production", "Enlarged pores", "Bacterial growth"],
    recommendations: ["Oil control", "Pore care"]
  },
  { 
    value: "URBAN", 
    label: "Urban Environment", 
    description: "City environment with high pollution levels",
    icon: Building2,
    imageUrl: "https://toposmagazine.com/wp-content/uploads/2023/05/Zhengzhou_Greenland_Central_Plaza_in_fog-scaled.jpg",
    effects: ["Free radical damage", "Clogged pores", "Dull complexion"],
    recommendations: ["Antioxidant protection", "Deep cleansing"]
  }
]



function EnvironmentalFactorsStep({step}: {step: number}) {
  const { form, handleBack, handleNext,setFormData } = useFormStep({
    schema: climateTypesSchema,
    currentStep: step,
  })

  const climateType = form.watch("climateType")

  useEffect(() => {
    setFormData({
      ...form.getValues(),
      climateType,
    })
  }, [climateType])

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-left md:text-center">
        <CardTitle className="text-4xl font-bold">Your Environment</CardTitle>
        <CardDescription className="text-lg max-w-2xl mx-auto">
          Select the environmental factor that affects your skin the most
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            <FormField
              control={form.control}
              name="climateType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      {environmentalOptions.map((option) => (
                        <div 
                          key={option.value}
                          className={`
                            relative rounded-xl border overflow-hidden
                            transition-all duration-300 ease-in-out
                            hover:scale-[1.02] hover:shadow-lg cursor-pointer
                            ${field.value === option.value ? 
                              'ring-2 ring-primary shadow-md' : 
                              'hover:bg-accent/50'}
                          `}
                          onClick={() => field.onChange(option.value)}
                        >
                          <div className="absolute top-4 right-4 z-10">
                            <RadioGroupItem value={option.value} id={option.value} />
                          </div>
                          
                          {/* Image Section */}
                          <div className="w-full h-48 relative">
                            <img 
                              src={option.imageUrl} 
                              alt={`${option.label} environment`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                              <div className="flex items-center gap-2">
                                <option.icon className="w-5 h-5" />
                                <FormLabel className="text-xl font-bold">
                                  {option.label}
                                </FormLabel>
                              </div>
                              <p className="text-sm opacity-90">{option.description}</p>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-4 space-y-3">
                            <div>
                              <h4 className="text-sm font-medium">Effects on Skin</h4>
                              <ul className="space-y-1">
                                {option.effects.map((effect, index) => (
                                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-primary" />
                                    {effect}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium">Key Focus Areas</h4>
                              <div className="flex flex-wrap gap-2">
                                {option.recommendations.map((rec, index) => (
                                  <span 
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                                  >
                                    {rec}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-8">
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
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default EnvironmentalFactorsStep