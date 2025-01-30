import { motion } from 'framer-motion';
import { useFormStep } from "@/lib/hooks/use-form-step";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  Brush, 

  Apple, 
  Circle, 
  ChevronRight, 
  ChevronLeft,
  FlaskConical
} from "lucide-react";
import { z } from "zod";

const exfoliationSchema = z.discriminatedUnion("exfoliationFrequency", [
  z.object({ exfoliationFrequency: z.literal("NEVER") }),
  z.object({
    exfoliationFrequency: z.enum(["WEEKLY", "TWO_TO_THREE_TIMES_WEEK"]),
    exfoliationType: z.enum(["PHYSICAL_SCRUBS", "CHEMICAL_EXFOLIANTS", "ENZYME_EXFOLIATORS"], {
      required_error: "Please select your preferred exfoliation type"
    }).optional()
  })
]);

const ExfoliationTolerance = ({ step }: { step: number }) => {
  const { form, handleBack, handleNext } = useFormStep({
    schema: exfoliationSchema,
    currentStep: step,
  });

  const exfoliationFrequencyOptions = [
    { 
      value: "NEVER", 
      label: "Never", 
      description: "No current exfoliation routine",
      icon: Circle,
      details: "Best for extremely sensitive skin or those new to skincare routines"
    },
    { 
      value: "WEEKLY", 
      label: "Weekly", 
      description: "Occasional gentle exfoliation",
      icon: Circle,
      details: "Ideal for sensitive or normal skin types seeking balanced maintenance"
    },
    { 
      value: "TWO_TO_THREE_TIMES_WEEK", 
      label: "2-3 times a week", 
      description: "Regular exfoliation routine",
      icon: Circle,
      details: "Perfect for oily or combination skin types requiring frequent cell turnover"
    }
  ];

  const exfoliationTypeOptions = [
    { 
      value: "PHYSICAL_SCRUBS", 
      label: "Physical Scrubs", 
      description: "Mechanical exfoliation with granular particles",
      icon: Brush,
      details: "Best for: Oily skin, thick skin texture. Use with gentle pressure in circular motions.",
      gradient: "from-blue-50 to-blue-100"
    },
    { 
      value: "CHEMICAL_EXFOLIANTS", 
      label: "Chemical Exfoliants (AHAs/BHAs)", 
      description: "Acid-based exfoliation for deeper skin renewal",
      icon: FlaskConical,
      details: "Best for: Aging concerns, hyperpigmentation. Start with lower concentrations.",
      gradient: "from-purple-50 to-purple-100"
    },
    { 
      value: "ENZYME_EXFOLIATORS", 
      label: "Enzyme Exfoliators", 
      description: "Gentle protein-based exfoliation",
      icon: Apple,
      details: "Best for: Sensitive skin, rosacea-prone. Natural option derived from fruits.",
      gradient: "from-green-50 to-green-100"
    }
  ];

  const exfoliationFrequency = form.watch("exfoliationFrequency");

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold ">
          Exfoliation Preferences
        </CardTitle>
        <CardDescription className="text-lg">
          Let's find the perfect exfoliation routine for your skin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-8">
            <FormField
              control={form.control}
              name="exfoliationFrequency"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">How often do you exfoliate?</h3>
                    <p className="text-muted-foreground">Select your current or desired frequency</p>
                  </div>
                  <Separator className="my-4" />
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "NEVER") {
                          form.setValue("exfoliationType", undefined);
                        }
                      }}
                      defaultValue={field.value}
                      className="space-y-3"
                    >
                      {exfoliationFrequencyOptions.map((option) => (
                        <motion.div
                          key={option.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="relative flex items-center space-x-4 rounded-lg border p-4 hover:bg-accent cursor-pointer">
                            <RadioGroupItem value={option.value} id={`freq-${option.value}`} />
                            <Label htmlFor={`freq-${option.value}`} className="flex flex-col cursor-pointer flex-1">
                              <span className="text-lg font-semibold">{option.label}</span>
                              <span className="text-muted-foreground">{option.description}</span>
                              <p className="mt-2 text-sm text-muted-foreground italic">{option.details}</p>
                            </Label>
                          </div>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {exfoliationFrequency !== "NEVER" && (
              <FormField
                control={form.control}
                name="exfoliationType"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">What's your preferred exfoliation method?</h3>
                      <p className="text-muted-foreground">Choose the type that best suits your skin</p>
                    </div>
                    <Separator className="my-4" />
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-3"
                      >
                        {exfoliationTypeOptions.map((option) => (
                          <motion.div
                            key={option.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div 
                              className={`relative flex items-center space-x-4 rounded-lg border p-4 cursor-pointer bg-gradient-to-r ${option.gradient}`}
                            >
                              <RadioGroupItem value={option.value} id={`type-${option.value}`} />
                              <div className="flex items-center space-x-4 flex-1">
                                <motion.div
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.5 }}
                                  className="p-2 bg-white rounded-full shadow-sm"
                                >
                                  <option.icon className="w-6 h-6" />
                                </motion.div>
                                <Label htmlFor={`type-${option.value}`} className="flex flex-col cursor-pointer flex-1">
                                  <span className="text-lg font-semibold">{option.label}</span>
                                  <span className="text-muted-foreground">{option.description}</span>
                                  <p className="mt-2 text-sm text-muted-foreground italic">{option.details}</p>
                                </Label>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-between pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button 
                type="submit"
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ExfoliationTolerance;