import { z } from "zod"
import { useFormStep } from "@/lib/hooks/use-form-step"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sparkles } from 'lucide-react'

const ageGroupSchema = z.object({
  ageGroup: z.enum([
    "TEENS", 
    "TWENTIES", 
    "THIRTIES", 
    "FORTIES", 
    "FIFTIES", 
    "SIXTIES_PLUS"
  ], {
    required_error: "Please select your age group"
  })
})

type AgeGroupForm = z.infer<typeof ageGroupSchema>

export function AgeGroup({step}: {step: number}) {
  const { form, handleBack, handleNext } = useFormStep<AgeGroupForm>({
    schema: ageGroupSchema,
    currentStep: step,
  })

  const ageGroupOptions = [
    { 
      value: "TEENS", 
      label: "Teens (13-19)", 
      description: "Focus on oiliness and breakouts",
      skinFocus: "Controlling oil and preventing acne",
      keyIngredients: [
        "Salicylic Acid",
        "Hyaluronic Acid"
      ],
      bgColor: "bg-blue-50",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr_Fwe5vK_l0HlV4znGl-GuSlb79I2eVnDBQ&s"
    },
    { 
      value: "TWENTIES", 
      label: "20s", 
      description: "Preventative skincare",
      skinFocus: "Maintaining skin health and preventing early signs of aging",
      keyIngredients: [
        "Hyaluronic Acid",
        "Vitamin C",
        "Glycolic Acid"
      ],
      bgColor: "bg-pink-50",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF2qLT7T2vRqbGGabVph55yb-jKtklhSS8ng&s"
    },
    { 
      value: "THIRTIES", 
      label: "30s", 
      description: "Anti-aging and hydration",
      skinFocus: "Restoring hydration and early anti-aging",
      keyIngredients: [
        "Retinol",
        "Hyaluronic Acid",
        "Vitamin C"
      ],
      bgColor: "bg-purple-50",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPoMBa9NlASWugpVnGf9YYJJuEpcgezZXMJg&s"
    },
    { 
      value: "FORTIES", 
      label: "40s", 
      description: "Targeting age spots and fine lines",
      skinFocus: "Addressing fine lines, wrinkles, and uneven skin tone",
      keyIngredients: [
        "Peptides",
        "Retinol",
        "Hyaluronic Acid"
      ],
      bgColor: "bg-orange-50",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoL8X8Cy7-S_fuy5GKdasasj-DJzi5uFEy6A&s"
    },
    { 
      value: "FIFTIES", 
      label: "50s", 
      description: "Addressing skin texture and signs of aging",
      skinFocus: "Improving skin texture, reducing age spots",
      keyIngredients: [
        "Peptides",
        "Niacinamide"
      ],
      bgColor: "bg-green-50",
      imageUrl: "https://img.freepik.com/premium-photo/happy-asian-woman-50s-pampering-skin-spa-ad_1168123-85572.jpg"
    },
    { 
      value: "SIXTIES_PLUS", 
      label: "60s and above", 
      description: "Intense hydration and skin renewal",
      skinFocus: "Combating dry skin and improving overall skin texture",
      keyIngredients: [
        "Vitamin B5",
        "Niacinamide",
        "Squalane"
      ],
      bgColor: "bg-yellow-50",
      imageUrl: "https://www.currentbody.com.au/cdn/shop/articles/Best_skincare_devices_for_your_60_s_and_70_s.png?v=1712056320"
    }
  ]

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-left md:text-center">
        <CardTitle className="text-4xl font-bold">Your Age Group</CardTitle>
        <CardDescription className="text-lg max-w-2xl mx-auto">
          Help us customize your perfect skincare routine based on your age group
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            <FormField
              control={form.control}
              name="ageGroup"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {ageGroupOptions.map((option) => (
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
                            <RadioGroupItem 
                              value={option.value} 
                              id={option.value} 
                              className={`
                                ${field.value === option.value ? 
                                  'bg-primary text-primary-foreground' : 
                                  'bg-transparent'}
                              `}
                            />
                          </div>
                          
                          {/* Image Section */}
                          <div className="w-full h-48 relative">
                            <img 
                              src={option.imageUrl} 
                              alt={`${option.label} skincare`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                              <h3 className="text-xl font-bold">{option.label}</h3>
                              <p className="text-sm opacity-90">{option.description}</p>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-4 space-y-3">
                            <div>
                              <Label className="text-sm font-medium">Skin Focus</Label>
                              <p className="text-sm text-muted-foreground">{option.skinFocus}</p>
                            </div>
                            
                            <div>
                              <Label className="text-sm font-medium">Key Ingredients</Label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {option.keyIngredients.map((ingredient, index) => (
                                  <span 
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                                  >
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    {ingredient}
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
                className="w-28"
              >
                Back
              </Button>
              <Button 
                type="submit"
                className="w-28"
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

export default AgeGroup