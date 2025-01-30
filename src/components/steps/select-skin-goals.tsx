import { useState, useRef, useEffect } from 'react';
import { z } from "zod"
import { useFormStep } from "@/lib/hooks/use-form-step"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const skinGoalsSchema = z.discriminatedUnion("primaryGoal", [
  z.object({
    primaryGoal: z.literal("ACNE"),
    acneType: z.enum(["HORMONAL", "STRESS_RELATED", "CONGESTION"], {
      required_error: "Please select your acne type"
    })
  }),
  z.object({
    primaryGoal: z.enum(["BRIGHTENING", "PORE_MINIMIZATION", "ANTI_AGING", "HYDRATION"]),
  })
])

function SelectSkinGoals({step}: {step: number}) {
  const { form, handleBack, handleNext } = useFormStep({
    schema: skinGoalsSchema,
    currentStep: step,
  });

  const [completedSections, setCompletedSections] = useState({
    primaryGoal: false,
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

  const ScrollIndicator = () => (
    <div 
      className="flex justify-center items-center mt-4 text-muted-foreground scroll-indicator"
    >
      <ChevronDown className="w-6 h-6" />
      <span className="ml-2 text-sm">Scroll or select an option to continue</span>
    </div>
  );

  const handleSectionComplete = (section: keyof typeof completedSections, value: any) => {
    setCompletedSections(prev => ({
      ...prev,
      [section]: true
    }));
    form.setValue(section as any, value);

    // Auto-scroll to next section after a brief delay
    requestAnimationFrame(() => {
      if (section === 'primaryGoal' && value === "ACNE" && acneTypeRef.current) {
        smoothScrollToSection(acneTypeRef);
      }
    });
  };

  const renderPrimaryGoalOptions = () => (
    <RadioGroup
      onValueChange={(value) => {
        handleSectionComplete('primaryGoal', value);
        if (value === "ACNE") {
          form.setValue("acneType", "HORMONAL");
        } 
      }}
      defaultValue={form.getValues("primaryGoal")}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {skinGoalOptions.map((option) => (
        <motion.div
          key={option.value}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div 
            className={cn(
              "relative rounded-xl border p-6 transition-all duration-300 ease-in-out cursor-pointer",
              form.getValues("primaryGoal") === option.value 
                ? "bg-primary/5 border-primary shadow-md ring-2 ring-primary" 
                : "hover:bg-accent/50 hover:scale-[1.02]"
            )}
            onClick={() => handleSectionComplete('primaryGoal', option.value)}
          >
            <div className="absolute top-4 right-4">
              <RadioGroupItem 
                value={option.value} 
                id={option.value} 
                className={cn(
                  form.getValues("primaryGoal") === option.value 
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
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {[
        { 
          value: "HORMONAL", 
          label: "Hormonal Acne", 
          description: "Typically appears along jawline and chin",
          icon: "🌙"
        },
        { 
          value: "STRESS_RELATED", 
          label: "Stress-Related", 
          description: "Flares up during periods of high stress",
          icon: "😮‍💨"
        },
        { 
          value: "CONGESTION", 
          label: "Congestion", 
          description: "Small bumps and blackheads",
          icon: "🔍"
        }
      ].map((option) => (
        <motion.div
          key={option.value}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div 
            className={cn(
              "relative rounded-xl border p-4 transition-all duration-300 ease-in-out cursor-pointer",
              form.getValues("acneType") === option.value 
                ? "bg-primary/5 border-primary shadow-sm ring-2 ring-primary" 
                : "hover:bg-accent/50 hover:scale-[1.02]"
            )}
            onClick={() => {
              form.setValue("acneType", option.value as "HORMONAL" | "STRESS_RELATED" | "CONGESTION");
              setCompletedSections(prev => ({
                ...prev,
                acneType: true
              }));
            }}
          >
            <div className="absolute top-4 right-4">
              <RadioGroupItem 
                value={option.value} 
                id={`acne-${option.value.toLowerCase()}`} 
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xl">{option.icon}</span>
              </div>
              <Label 
                htmlFor={`acne-${option.value.toLowerCase()}`} 
                className="flex flex-col cursor-pointer space-y-1"
              >
                <span className="font-semibold">{option.label}</span>
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

  const skinGoalOptions = [
    { 
      value: "ANTI_AGING", 
      label: "Anti-Aging", 
      description: "Reduce fine lines and wrinkles",
      icon: "✨",
      illustration: (
        <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-2xl">✨</span>
        </div>
      )
    },
    { 
      value: "ACNE", 
      label: "Acne Control", 
      description: "Prevent and treat breakouts",
      icon: "🔍",
      illustration: (
        <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-2xl">🔍</span>
        </div>
      )
    },
    { 
      value: "HYDRATION", 
      label: "Hydration Boost", 
      description: "Improve moisture retention",
      icon: "💧",
      illustration: (
        <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-2xl">💧</span>
        </div>
      )
    },
    { 
      value: "BRIGHTENING", 
      label: "Brightening", 
      description: "Reduce dark spots and discoloration",
      icon: "✨",
      illustration: (
        <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-2xl">✨</span>
        </div>
      )
    },
    { 
      value: "PORE_MINIMIZATION", 
      label: "Pore Minimization", 
      description: "Refine and reduce visible pores",
      icon: "⭐",
      illustration: (
        <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-2xl">⭐</span>
        </div>
      )
    }
  ]

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-left md:text-center">
        <CardTitle className="text-4xl font-bold">Your Skin Goals</CardTitle>
        <CardDescription className="text-lg max-w-2xl mx-auto">
          Select your primary skin concern to help us create your perfect skincare routine
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            {/* Primary Goal Section */}
            <div 
              ref={primaryGoalRef} 
              id="primary-goal-section"
              className="scroll-mt-20"
            >
              <FormField
                control={form.control}
                name="primaryGoal"
                render={() => (
                  <FormItem>
                    <FormControl>
                      {renderPrimaryGoalOptions()}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Acne Type Section */}
            {form.getValues("primaryGoal") === "ACNE" && (
              <div 
                ref={acneTypeRef} 
                id="acne-type-section"
                className={cn(
                  "space-y-4 overflow-hidden transition-all duration-500 ease-in-out scroll-mt-20",
                  form.getValues("primaryGoal") === "ACNE" 
                    ? "max-h-[500px] opacity-100 mt-8" 
                    : "max-h-0 opacity-0"
                )}
              >
                <div className="flex items-center gap-2 text-primary bg-primary/5 p-4 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm font-medium">Help us understand your acne type better</p>
                </div>
                <FormField
                  control={form.control}
                  name="acneType"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        {renderAcneTypeOptions()}
                      </FormControl>
                      {form.getValues("primaryGoal") === "ACNE" && !completedSections.acneType && <ScrollIndicator />}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex justify-between pt-8">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
                className="w-28"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit"
                disabled={
                  !completedSections.primaryGoal || 
                  (form.getValues("primaryGoal") === "ACNE" && !completedSections.acneType)
                }
                className="w-28"
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SelectSkinGoals;