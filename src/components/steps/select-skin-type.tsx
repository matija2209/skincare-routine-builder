import  { z } from "zod"
import { useFormStep } from "@/hooks/use-form-step"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"

const skinTypeSchema = z.object({
  skinType: z.enum(["OILY", "DRY", "COMBINATION", "SENSITIVE"], {
    required_error: "Please select your skin type",
  }),
})

type SkinTypeForm = z.infer<typeof skinTypeSchema>

function SkinTypeStep({step}: {step: number}) {
  const { form, handleBack, handleNext, handleNextOveride } = useFormStep({
    schema: skinTypeSchema,
    currentStep: step,
  })

  const customHandleSubmit = (data: SkinTypeForm) => {
    if (data.skinType === "SENSITIVE") {
      handleNextOveride(data, 3)
    } else {
      handleNext(data)
    }
  }

  const skinTypes = [
    {
      value: "OILY",
      title: "Oily Skin",
      description: "Shiny appearance with excess oil, especially in T-zone",
      features: ["Enlarged pores", "Prone to breakouts", "Shiny by midday"],
      imageSrc: "https://ensoulclinic.b-cdn.net/wp-content/uploads/2022/11/oily_skin_woman_makeup_greasy.png"
    },
    {
      value: "DRY",
      title: "Dry Skin",
      description: "Feels tight and may show visible flaking",
      features: ["Rough texture", "Feels tight", "Occasional redness"],
      imageSrc: "https://dl.geimshospital.com/uploads/image/AdobeStock_416637566-jpeg.webp"
    },
    {
      value: "COMBINATION",
      title: "Combination Skin",
      description: "Mix of oily and dry areas, typically oily T-zone",
      features: ["Oily T-zone", "Dry cheeks", "Variable pore size"],
      imageSrc: "https://drdennisgross.com/cdn/shop/articles/A_Guide_to_Skincare_for_Combination_Skin.png"
    },
    {
      value: "SENSITIVE",
      title: "Sensitive Skin",
      description: "Reactive to products and environmental factors",
      features: ["Easily irritated", "Prone to redness", "Reacts to products"],
      imageSrc: "https://deyga.in/cdn/shop/articles/38804b7bfc674ffc6d9dcbe74f0a8e22.jpg?v=1719985168&width=1100"
    }
  ]

  return (
    <Card className="border-none shadow-none w-full max-w-[95%] sm:max-w-6xl mx-auto">
      <CardHeader className="text-left md:text-center p-4 sm:p-6 animate-in slide-in-from-top duration-700">
        <CardTitle className="text-4xl font-bold">
          What's Your Skin Type?
        </CardTitle>
        <CardDescription className="text-base sm:text-lg mt-2">
          Select the option that best matches your skin's characteristics
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(customHandleSubmit)} className="space-y-4 sm:space-y-6">
            <FormField
              control={form.control}
              name="skinType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid gap-10 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    >
                      {skinTypes.map((type, index) => (
                        <div
                          key={type.value}
                          className={`relative animate-in fade-in slide-in-from-bottom-4 duration-700`}
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <RadioGroupItem
                            value={type.value}
                            id={type.value.toLowerCase()}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={type.value.toLowerCase()}
                            className="block cursor-pointer transition-all duration-300"
                          >
                            <div 
                              className={cn(
                                "rounded-xl overflow-hidden border-2 transition-all duration-300",
                                field.value === type.value 
                                  ? "ring-4 ring-primary ring-offset-4 scale-105 border-primary shadow-lg shadow-primary/20" 
                                  : "border-transparent hover:border-primary/50 hover:ring-2 hover:ring-offset-2 hover:ring-primary/50"
                              )}
                            >
                              <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden">
                                <img 
                                  src={type.imageSrc}
                                  alt={`${type.title} example`}
                                  className={cn(
                                    "object-cover w-full h-full transition-all duration-700",
                                    field.value === type.value 
                                      ? "scale-110 brightness-100" 
                                      : "brightness-75 grayscale-[50%] hover:brightness-90 hover:grayscale-0"
                                  )}
                                />
                                <div className={cn(
                                  "absolute inset-0 bg-gradient-to-t transition-opacity duration-300",
                                  field.value === type.value
                                    ? "from-primary/70 to-transparent"
                                    : "from-black/70 to-transparent"
                                )} />
                                <div className={cn(
                                  "absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transition-all duration-300",
                                  field.value === type.value
                                    ? "translate-y-0 bg-primary/20"
                                    : "hover:-translate-y-1"
                                )}>
                                  <h3 className="text-lg sm:text-xl font-semibold mb-0.5 sm:mb-1">{type.title}</h3>
                                  <p className="text-xs sm:text-sm text-white/90 line-clamp-2">{type.description}</p>
                                </div>
                              </div>
                              <div className={cn(
                                "p-2 sm:p-4 transition-all duration-300",
                                field.value === type.value 
                                  ? "bg-primary/10 shadow-inner" 
                                  : "bg-white hover:bg-gray-50"
                              )}>
                                <ul className="space-y-1 sm:space-y-2">
                                  {type.features.map((feature, index) => (
                                    <li 
                                      key={index} 
                                      className={cn(
                                        "text-xs sm:text-sm flex items-center transition-all duration-300",
                                        field.value === type.value 
                                          ? "text-primary font-medium translate-x-2" 
                                          : "text-gray-600 hover:translate-x-1"
                                      )}
                                    >
                                      <span 
                                        className={cn(
                                          "w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0 transition-all duration-300",
                                          field.value === type.value 
                                            ? "bg-primary scale-150" 
                                            : "bg-gray-300"
                                        )} 
                                      />
                                      <span className="line-clamp-1">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-4 sm:pt-8 animate-in fade-in-50 duration-700 delay-700">
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
                disabled={!form.watch('skinType')}
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

export default SkinTypeStep