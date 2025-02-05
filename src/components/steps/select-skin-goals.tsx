import { useState, useRef, useEffect } from 'react';
import { z } from "zod"
import { useFormStep } from "@/hooks/use-form-step"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { skinGoalOptions } from '@/lib/lifestyle-options';

const skinGoalsSchema = z.discriminatedUnion("skinGoal", [
  z.object({
    skinGoal: z.literal("ACNE"),
    acneType: z.enum(["HORMONAL", "STRESS_RELATED", "CONGESTION"], {
      required_error: "Please select your acne type"
    })
  }),
  z.object({
    skinGoal: z.enum(["BRIGHTENING", "PORE_MINIMIZATION", "ANTI_AGING", "HYDRATION"]),
  })
])

function SelectSkinGoals({step}: {step: number}) {
  const { form, handleBack, handleNext } = useFormStep({
    schema: skinGoalsSchema,
    currentStep: step,
  });

  const [completedSections, setCompletedSections] = useState({
    skinGoal: false,
    acneType: false
  });

  const primaryGoalRef = useRef<HTMLDivElement>(null);
  const acneTypeRef = useRef<HTMLDivElement>(null);

  // Smooth scroll function
  const smoothScrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  // Add custom CSS for scroll behavior and animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 100px;
      }
      
      @keyframes bounce-scroll {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      
      .scroll-indicator {
        animation: bounce-scroll 1s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);



  const handleSectionComplete = (section: keyof typeof completedSections, value: any) => {
    setCompletedSections(prev => ({
      ...prev,
      [section]: true
    }));
    form.setValue(section as any, value);

    // Auto-scroll to next section after a brief delay
    requestAnimationFrame(() => {
      if (section === 'skinGoal' && value === "ACNE" && acneTypeRef.current) {
        smoothScrollToSection(acneTypeRef);
      }
    });
  };

  const renderPrimaryGoalOptions = () => (
    <RadioGroup
      onValueChange={(value) => {
        handleSectionComplete('skinGoal', value);
        if (value === "ACNE") {
          form.setValue("acneType", "HORMONAL");
        } 
      }}
      defaultValue={form.getValues("skinGoal")}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {skinGoalOptions.map((option, index) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div 
            className={cn(
              "relative rounded-xl border p-6 transition-all duration-300 ease-in-out cursor-pointer",
              form.getValues("skinGoal") === option.value 
                ? "bg-primary/5 border-primary shadow-md ring-2 ring-primary" 
                : "hover:bg-accent/50"
            )}
            onClick={() => handleSectionComplete('skinGoal', option.value)}
          >
            <div className="absolute top-4 right-4">
              <RadioGroupItem 
                value={option.value} 
                id={option.value} 
                className={cn(
                  form.getValues("skinGoal") === option.value 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-transparent"
                )}
              />
            </div>
            <div className="flex flex-col items-center text-center">
              {option.illustration}
              <Label 
                htmlFor={option.value} 
                className="flex flex-col cursor-pointer space-y-2"
              >
                <span className="font-semibold text-lg">
                  {option.label}
                  {option.value === "ACNE" && (
                    <span className="block text-xs text-primary-foreground bg-primary mt-1 px-2 py-1 rounded-full">
                      Additional options
                    </span>
                  )}
                </span>
                <span className="text-sm text-muted-foreground">
                  {option.description}
                </span>
              </Label>
            </div>
          </div>
        </motion.div>
      ))}
    </RadioGroup>
  );

  const renderAcneTypeOptions = () => (
    <RadioGroup
      onValueChange={(value) => {
        form.setValue("acneType", value as "HORMONAL" | "STRESS_RELATED" | "CONGESTION");
        setCompletedSections(prev => ({
          ...prev,
          acneType: true
        }));
      }}
      defaultValue={form.getValues("acneType")}
      className="grid gap-4 md:grid-cols-3"
    >
      {[
        { 
          value: "HORMONAL", 
          label: "Hormonal Acne", 
          description: "Typically appears along jawline and chin, often cyclical with hormonal changes",
          icon: "🌙"
        },
        { 
          value: "STRESS_RELATED", 
          label: "Stress-Related", 
          description: "Flares up during periods of high stress, often accompanied by inflammation",
          icon: "😮‍💨"
        },
        { 
          value: "CONGESTION", 
          label: "Congestion", 
          description: "Small bumps, blackheads, and clogged pores due to excess oil and debris",
          icon: "🔍"
        }
      ].map((option, index) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div
            className={cn(
              "group flex items-start space-x-4 rounded-xl p-6 cursor-pointer",
              "border-2 transition-all duration-300 ease-in-out",
              form.getValues("acneType") === option.value
                ? "border-primary bg-primary/10 shadow-lg"
                : "border-muted hover:border-primary/30 hover:bg-accent/20"
            )}
            onClick={() => {
              form.setValue("acneType", option.value as "HORMONAL" | "STRESS_RELATED" | "CONGESTION");
              setCompletedSections(prev => ({
                ...prev,
                acneType: true
              }));
            }}
          >
            <div className="flex-shrink-0">
              <div className={cn(
                "h-6 w-6 rounded-full border-2 flex items-center justify-center",
                form.getValues("acneType") === option.value 
                  ? "border-primary bg-primary text-white"
                  : "border-muted-foreground group-hover:border-primary"
              )}>
                {form.getValues("acneType") === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-current rounded-full"
                  />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{option.icon}</span>
                <Label 
                  htmlFor={`acne-${option.value.toLowerCase()}`}
                  className="text-lg font-semibold cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {option.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </RadioGroup>
  );

 

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-left md:text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CardTitle >
            Your Skin Goals
          </CardTitle>
          <CardDescription>
            Select your primary skin concern to help us create your perfect skincare routine
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            {/* Primary Goal Section */}
            <motion.div 
              ref={primaryGoalRef} 
              id="primary-goal-section"
              className="scroll-mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="skinGoal"
                render={() => (
                  <FormItem>
                    <FormControl>
                      {renderPrimaryGoalOptions()}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Acne Type Section */}
            <AnimatePresence>
              {form.getValues("skinGoal") === "ACNE" && (
                <motion.div 
                  ref={acneTypeRef} 
                  id="acne-type-section"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 scroll-mt-20 overflow-hidden"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-primary bg-primary/5 p-4 rounded-lg"
                  >
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">Help us understand your acne type better</p>
                  </motion.div>
                  <FormField
                    control={form.control}
                    name="acneType"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          {renderAcneTypeOptions()}
                        </FormControl>
                        <FormMessage />
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
                back
                onClick={handleBack}
              >
                Back
              </Button>
              <Button 
                type="submit"
                front
                disabled={
                  !completedSections.skinGoal || 
                  (form.getValues("skinGoal") === "ACNE" && !completedSections.acneType)
                }
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

export default SelectSkinGoals;
