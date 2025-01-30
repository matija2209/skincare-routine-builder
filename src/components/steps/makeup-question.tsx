import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useFormStep } from '@/lib/hooks/use-form-step';
import {  ChevronRight, ChevronLeft } from 'lucide-react';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { frequencyOptions, makeupTypeOptions, wearsMakeupOptions } from '@/lib/lifestyle-options';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const makeupQuestionSchema = z.object({
  wearsMakeup: z.boolean(),
  makeupTypes: z.array(z.string()).optional(),
  frequency: z.enum(['DAILY', 'FEW_TIMES_WEEK', 'WEEKENDS_ONLY', 'SPECIAL_OCCASIONS']).optional()
});

const MakeupQuestion = ({ step }: { step: number }) => {
  const { form, handleBack, handleNext } = useFormStep({
    schema: makeupQuestionSchema,
    currentStep: step,
  });

  const [completedSections, setCompletedSections] = useState({
    wearsMakeup: false,
    makeupTypes: false,
    frequency: false
  });

  const [selectedMakeupTypes, setSelectedMakeupTypes] = useState<string[]>([]);

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

  // Create refs for each section
  // const wearsMakeupRef = useRef<HTMLDivElement>(null);
  const makeupTypesRef = useRef<HTMLDivElement>(null);
  const frequencyRef = useRef<HTMLDivElement>(null);

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
    form.setValue(section, value);

    // Auto-scroll to next section after a brief delay
    requestAnimationFrame(() => {
      if (section === 'wearsMakeup' && value === true && makeupTypesRef.current) {
        smoothScrollToSection(makeupTypesRef);
      } else if (section === 'makeupTypes' && selectedMakeupTypes.length > 0 && frequencyRef.current) {
        smoothScrollToSection(frequencyRef);
      }
    });
  };

  const handleMakeupTypeToggle = (type: string) => {
    const updatedTypes = selectedMakeupTypes.includes(type)
      ? selectedMakeupTypes.filter(t => t !== type)
      : [...selectedMakeupTypes, type];
    
    setSelectedMakeupTypes(updatedTypes);
    form.setValue('makeupTypes', updatedTypes);
    
    if (updatedTypes.length > 0) {
      handleSectionComplete('makeupTypes', updatedTypes);
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-violet-600 bg-clip-text text-transparent">
            Your Makeup Routine
          </CardTitle>
          <CardDescription className="text-lg mt-4 max-w-2xl mx-auto">
            Help us understand your makeup habits to provide better skincare recommendations
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
            {/* Wears Makeup Section */}
            <FormField
              control={form.control}
              name="wearsMakeup"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => handleSectionComplete('wearsMakeup', value === 'true')}
                      defaultValue={field.value ? 'true' : 'false'}
                    >
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="space-y-4"
                      >
                        {wearsMakeupOptions.map((option) => (
                          <motion.div
                            key={String(option.value)}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <div 
                              className={`
                                relative flex items-center space-x-4 rounded-lg border p-6
                                cursor-pointer bg-gradient-to-r ${option.bgColor}
                                transition-all duration-300
                                group
                                ${field.value === option.value 
                                  ? "ring-2 ring-primary shadow-lg scale-[1.02]" 
                                  : "hover:shadow-md hover:border-primary/50"}
                              `}
                            >
                              <RadioGroupItem 
                                value={String(option.value)} 
                                id={String(option.value)}
                                className="transition-transform duration-300 group-hover:scale-110"
                              />
                              
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.7 }}
                                className="p-3 bg-white rounded-full shadow-sm relative"
                              >
                                {option.icon}
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

                              <Label htmlFor={String(option.value)} className="flex flex-col cursor-pointer flex-1">
                                <div className="flex justify-between items-center w-full">
                                  <span className="font-semibold text-lg">{option.label}</span>
                                </div>
                                <span className="text-muted-foreground mt-1">
                                  {option.description}
                                </span>
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

{completedSections.wearsMakeup  && form.getValues('wearsMakeup') && <>
<CardTitle className="text-2xl mb-4">Select Makeup Types</CardTitle>
</>}
            {/* Makeup Types Section */}
            {completedSections.wearsMakeup && form.getValues('wearsMakeup') && (
              <FormField
                control={form.control}
                name="makeupTypes"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        {makeupTypeOptions.map((option) => (
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
                                cursor-pointer bg-gradient-to-r from-purple-50 to-purple-100
                                transition-all duration-300
                                group
                                ${selectedMakeupTypes.includes(option.value)
                                  ? "ring-2 ring-primary shadow-lg scale-[1.02]" 
                                  : "hover:shadow-md hover:border-primary/50"}
                              `}
                              onClick={() => handleMakeupTypeToggle(option.value)}
                            >
                              <div className="p-3 bg-white rounded-full shadow-sm relative">
                                <span className="text-2xl">{option.icon}</span>
                              </div>

                              <Label className="flex flex-col cursor-pointer flex-1">
                                <div className="flex justify-between items-center w-full">
                                  <span className="font-semibold text-lg">{option.label}</span>
                                </div>
                              </Label>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {completedSections.makeupTypes && form.getValues('wearsMakeup')  && selectedMakeupTypes.length > 0 && <>
            <CardTitle className="text-2xl mb-4">Select Application Frequency</CardTitle>
            </>}
            {/* Frequency Section */}
            {completedSections.makeupTypes && form.getValues('wearsMakeup') && selectedMakeupTypes.length > 0 && (
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => handleSectionComplete('frequency', value)}
                        defaultValue={field.value}
                      >
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="show"
                          className=" grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          {frequencyOptions.map((option) => (
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
                                  cursor-pointer bg-gradient-to-r ${option.bgColor}
                                  transition-all duration-300
                                  group
                                  ${field.value === option.value 
                                    ? "ring-2 ring-primary shadow-lg scale-[1.02]" 
                                    : "hover:shadow-md hover:border-primary/50"}
                                `}
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
                                  {option.icon}
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
                                  </div>
                                  <span className="text-muted-foreground mt-1">
                                    {option.description}
                                  </span>
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
            )}

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
                <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back
              </Button>
              <Button 
                type="submit"
                disabled={
                  !completedSections.wearsMakeup || 
                  (form.getValues('wearsMakeup') && 
                    (!completedSections.makeupTypes || !completedSections.frequency))
                }
                className="group"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MakeupQuestion;