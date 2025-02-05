import { motion } from 'framer-motion';
import { z } from "zod";
import { useFormStep } from "@/hooks/use-form-step";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wallet, CreditCard, Diamond, DollarSign } from 'lucide-react';

const budgetAllocationSchema = z.object({
  monthlyBudget: z.enum(["LOW", "MID_RANGE", "LUXURY"], {
    required_error: "Please select your monthly skincare budget"
  })
});

type BudgetAllocationForm = z.infer<typeof budgetAllocationSchema>;

export function BudgetAllocation({step}: {step: number}) {
  const { form, handleBack, handleNext } = useFormStep<BudgetAllocationForm>({
    schema: budgetAllocationSchema,
    currentStep: step,
  });

  const budgetOptions = [
    { 
      value: "LOW", 
      label: "Budget-Friendly", 
      description: "Less than $50 per month", 
      range: "<$50/month",
      icon: Wallet,
      gradient: "from-emerald-50 to-emerald-100",
      dollarSigns: 1
    },
    { 
      value: "MID_RANGE", 
      label: "Mid-Range", 
      description: "Balanced investment in skincare", 
      range: "$50-$150/month",
      icon: CreditCard,
      gradient: "from-violet-50 to-violet-100",
      dollarSigns: 2
    },
    { 
      value: "LUXURY", 
      label: "Luxury Skincare", 
      description: "Premium and high-end products", 
      range: "$150+/month",
      icon: Diamond,
      gradient: "from-rose-50 to-rose-100",
      dollarSigns: 3
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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-left md:text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle >
            Budget Allocation
          </CardTitle>
          <CardDescription >
            Select your monthly budget for skincare products to help us tailor recommendations.
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            <FormField
              control={form.control}
              name="monthlyBudget"
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
                        className="grid grid-cols-1  lg:grid-cols-3 gap-4"
                      >
                        {budgetOptions.map((option) => (
                          <motion.div
                            key={option.value}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <div 
                              className={`
                                relative flex items-center space-x-4 rounded-lg border p-6
                                cursor-pointer bg-gradient-to-r ${option.gradient}
                                transition-all duration-300
                                group
                                ${field.value === option.value 
                                  ? "ring-2 ring-primary shadow-lg scale-[1.02]" 
                                  : "hover:shadow-md hover:border-primary/50"}
                              `}
                              onClick={() => field.onChange(option.value)}
                            >
                              <RadioGroupItem 
                                value={option.value} 
                                id={option.value}
                                className="transition-transform duration-300 group-hover:scale-110"
                              />
                              
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.7 }}
                                className="p-3 bg-white rounded-full shadow-sm relative"
                              >
                                <option.icon className="w-6 h-6 text-primary" />
                                <motion.div
                                  className="absolute inset-0 bg-primary/5 rounded-full"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0, 0.5, 0],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                  }}
                                />
                              </motion.div>

                              <Label htmlFor={option.value} className="flex flex-col cursor-pointer flex-1">
                                <div className="flex justify-between items-center w-full">
                                  <span className="font-semibold text-lg">{option.label}</span>
                                  <div className="flex space-x-1">
                                    {[...Array(option.dollarSigns)].map((_, i) => (
                                      <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                      >
                                        <DollarSign className="w-4 h-4 text-primary/70" />
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                                <span className="text-muted-foreground mt-1">
                                  {option.description}
                                </span>
                                <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                                  {option.range}
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
back              >
                Back
              </Button>
              <Button 
                type="submit"
front              >
                Continue
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default BudgetAllocation;