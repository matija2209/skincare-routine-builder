import { motion } from 'framer-motion';
import { z } from "zod";
import { useFormStep } from "@/lib/hooks/use-form-step";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Feather, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const routineComplexitySchema = z.object({
  routineComplexity: z.enum(["MINIMAL", "MODERATE", "COMPREHENSIVE"], {
    required_error: "Please select your preferred routine complexity"
  })
});

type RoutineComplexityForm = z.infer<typeof routineComplexitySchema>;

export function RoutineComplexity({step}: {step: number}) {
  const { form, handleBack, handleNext } = useFormStep<RoutineComplexityForm>({
    schema: routineComplexitySchema,
    currentStep: step,
  });

  const routineComplexityOptions = [
    { 
      value: "MINIMAL", 
      label: "Minimal Routine", 
      description: "Quick and essential care",
      icon: Feather,
      gradient: "from-blue-400 to-blue-600",
      steps: [1, 2, 3],
      color: "blue"
    },
    { 
      value: "MODERATE", 
      label: "Balanced Routine", 
      description: "Thoughtful daily maintenance",
      icon: Clock,
      gradient: "from-purple-400 to-purple-600",
      steps: [1, 2, 3, 4, 5, 6],
      color: "purple"
    },
    { 
      value: "COMPREHENSIVE", 
      label: "Comprehensive Ritual", 
      description: "Luxurious full regimen",
      icon: Sparkles,
      gradient: "from-pink-400 to-pink-600",
      steps: [1, 2, 3, 4, 5, 6, 7, 8],
      color: "pink"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 120 }
    }
  };

  const stepVariants = {
    rest: { scale: 1 },
    hover: (i: number) => ({
      scale: [1, 1.2, 1],
      transition: { delay: i * 0.1 }
    })
  };

  return (
    <Card className="border-none shadow-none max-w-4xl mx-auto">
      <CardHeader >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle >
            Routine Complexity
          </CardTitle>
          <CardDescription >
            Select your ideal skincare regimen intensity
          </CardDescription>
        </motion.div>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-8">
            <FormField
              control={form.control}
              name="routineComplexity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-8"
                    >
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                      >
                        {routineComplexityOptions.map((option) => (
                          <motion.div
                            key={option.value}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="relative"
                          >
                            <div 
                              className={cn(
                                "group relative flex flex-col justify-between rounded-2xl p-8 cursor-pointer",
                                "bg-gradient-to-br backdrop-blur-lg transition-all duration-300",
                                "h-64 shadow-lg hover:shadow-xl",
                                field.value === option.value 
                                  ? `${option.gradient} text-white`
                                  : "bg-muted/50 hover:bg-muted/70"
                              )}
                              onClick={() => field.onChange(option.value)}
                            >
                              <div className="flex items-start justify-between">
                                <motion.div
                                  className={cn(
                                    "p-3 rounded-xl backdrop-blur-sm",
                                    field.value === option.value 
                                      ? "bg-white/10"
                                      : "bg-primary/5"
                                  )}
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <option.icon className="w-8 h-8" />
                                </motion.div>
                                
                                <RadioGroupItem 
                                  value={option.value}
                                  className={cn(
                                    "absolute top-4 right-4 w-6 h-6 border-2",
                                    field.value === option.value 
                                      ? "border-white bg-primary/20"
                                      : "border-muted-foreground/30"
                                  )}
                                />
                              </div>

                              <div className="space-y-3">
                                <h3 className="text-2xl font-bold">{option.label}</h3>
                                <p className="text-sm">{option.description}</p>
                              </div>

                              <div className="flex gap-2 mt-4">
                                {option.steps.map((_, index) => (
                                  <motion.span
                                    key={index}
                                    className={cn(
                                      "w-3 h-3 rounded-full",
                                      field.value === option.value 
                                        ? "bg-white/80"
                                        : "bg-primary/30"
                                    )}
                                    variants={stepVariants}
                                    custom={index}
                                    animate={field.value === option.value ? "hover" : "rest"}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-center text-red-400 font-medium" />
                </FormItem>
              )}
            />

            <motion.div 
              className="flex justify-between pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
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
  );
}

export default RoutineComplexity;