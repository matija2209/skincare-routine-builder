import { motion } from 'framer-motion';
import { z } from "zod";
import { useFormStep } from "@/lib/hooks/use-form-step";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Feather, Clock, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
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
      description: "1-3 steps, quick and simple",
      icon: Feather,
      gradient: "from-blue-50 to-blue-100",
      steps: [1, 2, 3]
    },
    { 
      value: "MODERATE", 
      label: "Moderate Routine", 
      description: "4-6 steps, balanced approach",
      icon: Clock,
      gradient: "from-purple-50 to-purple-100",
      steps: [1, 2, 3, 4, 5, 6]
    },
    { 
      value: "COMPREHENSIVE", 
      label: "Comprehensive Routine", 
      description: "7+ steps, in-depth skincare",
      icon: Sparkles,
      gradient: "from-pink-50 to-pink-100",
      steps: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-left md:text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Routine Complexity
          </CardTitle>
          <CardDescription className="text-lg max-w-2xl mx-auto mt-2">
            Choose the level of complexity you're comfortable with in your skincare routine.
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            <FormField
              control={form.control}
              name="routineComplexity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-4"
                    >
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="space-y-4"
                      >
                        {routineComplexityOptions.map((option) => (
                          <motion.div
                            key={option.value}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div 
                              className={`
                                relative flex items-center space-x-4 rounded-lg border p-6
                                cursor-pointer bg-gradient-to-r ${option.gradient}
                                transition-all duration-300
                                group
                                ${field.value === option.value 
                                  ? "ring-2 ring-primary shadow-lg" 
                                  : "hover:shadow-md"}
                              `}
                            >
                              <RadioGroupItem 
                                value={option.value} 
                                id={option.value}
                                className="transition-transform duration-300 group-hover:scale-110"
                              />
                              
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="p-3 bg-white rounded-full shadow-sm"
                              >
                                <option.icon className="w-6 h-6 text-primary" />
                              </motion.div>

                              <Label htmlFor={option.value} className="flex flex-col cursor-pointer flex-1">
                                <span className="font-semibold text-lg">{option.label}</span>
                                <span className="text-muted-foreground">
                                  {option.description}
                                </span>
                                <div className="flex space-x-2 mt-3">
                                  {option.steps.map((step, index) => (
                                    <motion.div
                                      key={index}
                                      className={cn("w-2 h-2 rounded-full bg-primary/30",step)}
                                      initial={false}
                                      animate={field.value === option.value ? 
                                        { scale: [1, 1.2, 1], opacity: 1 } : 
                                        { scale: 1, opacity: 0.5 }}
                                      transition={{ delay: index * 0.1 }}
                                    />
                                  ))}
                                </div>
                              </Label>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <motion.div 
              className="flex justify-between pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
                className="group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back
              </Button>
              <Button 
                type="submit"
                className="group"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RoutineComplexity;