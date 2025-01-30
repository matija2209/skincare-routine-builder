import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { useFormStep } from '@/lib/hooks/use-form-step';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { lifestyleFactors, sleepPatternOptions, stressLevelOptions, sunExposureOptions, SunParticles } from '@/lib/lifestyle-options';

const lifestyleFactorsSchema = z.object({
    sunExposure: z.enum(["RARE", "MODERATE", "FREQUENT"], {
      required_error: "Please select your sun exposure level"
    }),
    stressLevels: z.enum(["LOW", "MEDIUM", "HIGH"], {
      required_error: "Please select your stress level"
    }),
    sleepPatterns: z.enum(["LESS_THAN_6_HRS", "6_TO_8_HRS", "MORE_THAN_8_HRS"], {
      required_error: "Please select your sleep pattern"
    })
  })


const LifestyleFactors = ({ step }: { step: number }) => {
    const { form, handleBack, handleNext } = useFormStep({
      schema: lifestyleFactorsSchema,
      currentStep: step,
    });
  
    const [completedSections, setCompletedSections] = useState({
      sunExposure: false,
      stressLevels: false,
      sleepPatterns: false
    });
  
    // Create refs for each section
    const sunExposureRef = useRef<HTMLDivElement>(null);
    const stressLevelsRef = useRef<HTMLDivElement>(null);
    const sleepPatternsRef = useRef<HTMLDivElement>(null);
  
    // Improved smooth scroll function using native scrollIntoView
    const smoothScrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    };
  
    const handleSectionComplete = (section: keyof typeof completedSections, value: any) => {
      setCompletedSections(prev => ({
        ...prev,
        [section]: true
      }));
      form.setValue(section, value);
  
      // Auto-scroll to next section after a brief delay
      requestAnimationFrame(() => {
        if (section === 'sunExposure' && stressLevelsRef.current) {
          smoothScrollToSection(stressLevelsRef);
        } else if (section === 'stressLevels' && sleepPatternsRef.current) {
          smoothScrollToSection(sleepPatternsRef);
        }
      });
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
  
    const renderOptionCards = (options: any[], fieldName: string) => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <motion.div
            key={option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={cn(
                "relative min-h-[300px] cursor-pointer transition-all duration-700 ease-in-out overflow-hidden",
                form.getValues(fieldName as "stressLevels" | "sleepPatterns" | "sunExposure") === option.value 
                  ? "ring-2 ring-primary shadow-lg transform" 
                  : "hover:shadow-md",
                // Add themed backgrounds for both stress and sleep
                fieldName === "stressLevels" && 
                form.getValues(fieldName as "stressLevels" | "sleepPatterns" | "sunExposure") === option.value && 
                "stress-mode",
                fieldName === "sleepPatterns" && 
                form.getValues(fieldName as "stressLevels" | "sleepPatterns" | "sunExposure") === option.value && 
                "night-mode"
              )}
              onClick={() => handleSectionComplete(fieldName as "stressLevels" | "sleepPatterns" | "sunExposure", option.value)}
            >
              {/* Night sky animation for sleep patterns */}
              {fieldName === "sleepPatterns" && (
                <div className="absolute inset-0 z-0">
                  <div 
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700",
                      form.getValues(fieldName as "stressLevels" | "sleepPatterns" | "sunExposure") === option.value
                        ? "opacity-100" 
                        : "opacity-0",
                      "bg-gradient-to-b",
                      option.theme?.background
                    )}
                  >
                    {/* Stars */}
                    <div className="stars absolute inset-0 z-10">
                      {[...Array(option.theme?.starCount || 20)].map((_, i) => (
                        <div
                          key={i}
                          className="star absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `twinkle ${1 + Math.random() * 2}s infinite ${Math.random() * 2}s`
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Moon */}
                    <div 
                      className={cn(
                        "moon absolute top-4 right-4 w-16 h-16 rounded-full transition-all duration-700",
                        "bg-gradient-to-br",
                        option.theme?.moonColor,
                        option.theme?.moonGlow,
                        form.getValues(fieldName) === option.value
                          ? "scale-100 opacity-100" 
                          : "scale-0 opacity-0"
                      )}
                    />
                  </div>
                </div>
              )}
              {/* Stress level animation background */}
              {fieldName === "stressLevels" && (
                <motion.div 
                  className="absolute inset-0 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: form.getValues(fieldName) === option.value ? 1 : 0 
                  }}
                  transition={{ duration: 0.7 }}
                >
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    "bg-gradient-to-b",
                    option.theme?.background
                  )} />
                </motion.div>
              )}

              {/* Sun exposure animation background */}
              {fieldName === "sunExposure" && (
                <div className="absolute inset-0 z-0">
                  <div 
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700",
                      form.getValues(fieldName) === option.value
                        ? "opacity-100" 
                        : "opacity-0",
                      "bg-gradient-to-b",
                      option.theme?.background
                    )}
                  />
                  {form.getValues(fieldName) === option.value && (
                    <SunParticles type={option.theme?.particles} />
                  )}
                </div>
              )}

              <CardContent className={cn(
                "relative z-10 p-6 flex flex-col items-center text-center",
                (fieldName === "stressLevels" || 
                 fieldName === "sleepPatterns" || 
                 fieldName === "sunExposure") && 
                form.getValues(fieldName) === option.value && 
                "text-white"
              )}>
                <motion.div
                  className={cn(
                    "transition-colors duration-700",
                    fieldName === "stressLevels" && option.theme?.color
                  )}
                  animate={{
                    scale: form.getValues(fieldName as "stressLevels" | "sleepPatterns" | "sunExposure") === option.value ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {option.icon}
                </motion.div>

                {/* Rest of the card content with conditional styling */}
                <h3 className="font-semibold mt-4">{option.label}</h3>
                <p className={cn(
                  "text-sm mt-2",
                  (fieldName === "stressLevels" || 
                   fieldName === "sleepPatterns" || 
                   fieldName === "sunExposure") && 
                  form.getValues(fieldName) === option.value
                    ? "text-white/80" 
                    : "text-muted-foreground"
                )}>
                  {option.description}
                </p>

                {/* Effects and Recommendations */}
                {option.effects && (
                  <div className="mt-4 text-left w-full">
                    <h4 className="text-sm font-medium mb-2">Effects on Skin</h4>
                    <ul className="space-y-1">
                      {option.effects.map((effect: string, index: number) => (
                        <motion.li 
                          key={index}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn(
                            "text-sm flex items-center gap-2",
                            (fieldName === "stressLevels" || 
                             fieldName === "sleepPatterns" || 
                             fieldName === "sunExposure") && 
                            form.getValues(fieldName) === option.value
                              ? "text-white/80" 
                              : "text-muted-foreground"
                          )}
                        >
                          <span className="w-1 h-1 rounded-full bg-primary" />
                          {effect}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {option.recommendations && (
                  <div className="mt-4 text-left w-full">
                    <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                    <div className="flex flex-wrap gap-2">
                      {option.recommendations.map((rec: string, index: number) => (
                        <span
                          key={index}
                          className={cn(
                            "inline-flex items-center px-2 py-1 rounded-full text-xs",
                            (fieldName === "stressLevels" || 
                             fieldName === "sleepPatterns" || 
                             fieldName === "sunExposure") && 
                            form.getValues(fieldName) === option.value
                              ? "bg-white/20 text-white"
                              : "bg-primary/10 text-primary"
                          )}
                        >
                          {rec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );

    return (
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className='text-4xl font-serif mb-4 text-left md:text-center'>Your Lifestyle Factors</CardTitle>
          <CardDescription>
            Help us understand your daily lifestyle to personalize your skincare routine.
          </CardDescription>
        </CardHeader>
  
          <CardContent className='p-0'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleNext)} className="space-y-8">
              <div className="space-y-8">
                {/* Sun Exposure Section */}
                <div 
                  ref={sunExposureRef} 
                  id="sun-exposure-section"
                  className={cn(
                    lifestyleFactors.sunExposure.containerClass,
                    "scroll-mt-20" // Add scroll margin to account for fixed headers
                  )}
                >
                  <FormField
                    control={form.control}
                    name="sunExposure"
                    render={() => (
                      <FormItem>
                        <div className="mb-6">
                          <Label className="text-lg font-semibold flex items-center gap-2">
                            {lifestyleFactors.sunExposure.title}
                            {completedSections.sunExposure && (
                              <span className="flex items-center text-primary text-sm">
                                <Check className="w-4 h-4 mr-1" /> Selected
                              </span>
                            )}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {lifestyleFactors.sunExposure.description}
                          </p>
                        </div>
                        {renderOptionCards(sunExposureOptions, 'sunExposure')}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
  
                {/* Stress Levels Section */}
                {completedSections.sunExposure && (
                  <div 
                    ref={stressLevelsRef} 
                    id="stress-levels-section"
                    className={cn(
                      lifestyleFactors.stressLevels.containerClass,
                      "scroll-mt-20"
                    )}
                  >
                    <FormField
                      control={form.control}
                      name="stressLevels"
                      render={() => (
                        <FormItem>
                          <div className="mb-6">
                            <Label className="text-lg font-semibold flex items-center gap-2">
                              {lifestyleFactors.stressLevels.title}
                              {completedSections.stressLevels && (
                                <span className="flex items-center text-primary text-sm">
                                  <Check className="w-4 h-4 mr-1" /> Selected
                                </span>
                              )}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {lifestyleFactors.stressLevels.description}
                            </p>
                          </div>
                          {renderOptionCards(stressLevelOptions, 'stressLevels')}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
  
                {/* Sleep Patterns Section */}
                {completedSections.stressLevels && (
                  <div 
                    ref={sleepPatternsRef} 
                    id="sleep-patterns-section"
                    className={cn(
                      lifestyleFactors.sleepPatterns.containerClass,
                      "scroll-mt-20"
                    )}
                  >
                    <FormField
                      control={form.control}
                      name="sleepPatterns"
                      render={() => (
                        <FormItem>
                          <div className="mb-6">
                            <Label className="text-lg font-semibold flex items-center gap-2">
                              {lifestyleFactors.sleepPatterns.title}
                              {completedSections.sleepPatterns && (
                                <span className="flex items-center text-primary text-sm">
                                  <Check className="w-4 h-4 mr-1" /> Selected
                                </span>
                              )}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {lifestyleFactors.sleepPatterns.description}
                            </p>
                          </div>
                          {renderOptionCards(sleepPatternOptions, 'sleepPatterns')}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
  
              <div className="flex justify-between pt-8">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={!completedSections.sleepPatterns}
                  className="flex items-center gap-2"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  };
  

export default LifestyleFactors;