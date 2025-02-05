import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFormStep } from "@/hooks/use-form-step";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  AlertCircle,
} from "lucide-react";
import { z } from "zod";
import { cn } from '@/lib/utils';
import {  exfoliationTypeOptions } from '@/lib/lifestyle-options';
import FrequencySelector from '../exo-frequency-selector';

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

  const [completedSections, setCompletedSections] = useState({
    exfoliationFrequency: false,
    exfoliationType: false
  });

  const frequencyRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);

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
      if (section === 'exfoliationFrequency' && typeRef.current) {
        smoothScrollToSection(typeRef);
      }
    });
  };

  const renderFrequencyOptions = () => (
    <FrequencySelector form={form} handleSectionComplete={handleSectionComplete} />
  );

  const renderTypeOptions = () => (
    <FormField
      control={form.control}
      name="exfoliationType"
      render={({ field }) => (
        <RadioGroup
          onValueChange={field.onChange}
          value={field.value}
          className="space-y-3"
        >
          {exfoliationTypeOptions.map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className={cn(
                  `relative flex items-center space-x-4 rounded-lg border p-4 cursor-pointer bg-gradient-to-r ${option.gradient}`,
                  field.value === option.value 
                    ? "ring-2 ring-primary shadow-lg" 
                    : "hover:shadow-md"
                )}
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
      )}
    />
  );



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
      <CardContent className='p-2 md:p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-8">
            {/* Exfoliation Frequency Section */}
            <div 
              ref={frequencyRef} 
              id="exfoliation-frequency-section"
              className="scroll-mt-20"
            >
              <FormField
                control={form.control}
                name="exfoliationFrequency"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (value === "NEVER") {
                            form.setValue("exfoliationType", undefined);
                          }
                        }}
                        defaultValue={field.value}
                      >
                        {renderFrequencyOptions()}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-2 text-primary bg-primary/5 p-4 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm font-medium">Help us understand your exfoliation tolerance better</p>
                </div>
            {/* Exfoliation Type Section */}
            {(form.getValues("exfoliationFrequency") === "WEEKLY" || 
              form.getValues("exfoliationFrequency") === "TWO_TO_THREE_TIMES_WEEK") && (
              <div 
                ref={typeRef} 
                id="exfoliation-type-section"
                className="scroll-mt-20"
              >
                {renderTypeOptions()}
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
back
              >
                <span>Back</span>
              </Button>
              <Button 
                type="submit"
                front
                disabled={
                  !completedSections.exfoliationFrequency || 
                  (form.getValues("exfoliationFrequency") !== "NEVER" && !completedSections.exfoliationType)
                }
              >
                <span>Continue</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ExfoliationTolerance;