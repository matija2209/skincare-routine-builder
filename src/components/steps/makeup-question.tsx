import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useFormStep } from '@/lib/hooks/use-form-step';
import { Check, Palette, Clock, X } from 'lucide-react';
import { z } from 'zod';

const makeupQuestionSchema = z.object({
  wearsMakeup: z.boolean(),
  makeupTypes: z.array(z.string()).optional(),
  frequency: z.enum(['DAILY', 'FEW_TIMES_WEEK', 'WEEKENDS_ONLY', 'SPECIAL_OCCASIONS']).optional()
});

const sections = {
  wearsMakeup: {
    title: "Makeup Usage",
    description: "Tell us about your makeup habits to better understand your skincare needs",
    containerClass: "bg-gradient-to-b from-pink-50/50 to-transparent p-6 rounded-lg border border-pink-100",
    iconClass: "text-pink-500"
  },
  makeupTypes: {
    title: "Types of Makeup",
    description: "Select all the makeup products you regularly use",
    containerClass: "bg-gradient-to-b from-purple-50/50 to-transparent p-6 rounded-lg border border-purple-100",
    iconClass: "text-purple-500"
  },
  frequency: {
    title: "Application Frequency",
    description: "How often do you typically wear makeup?",
    containerClass: "bg-gradient-to-b from-violet-50/50 to-transparent p-6 rounded-lg border border-violet-100",
    iconClass: "text-violet-500"
  }
};

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

  const wearsMakeupOptions = [
    {
      value: true,
      label: 'Yes, I wear makeup',
      description: 'I use makeup products regularly',
      icon: <Palette className="w-6 h-6" />,
      bgColor: 'bg-pink-50 hover:bg-pink-100/80'
    },
    {
      value: false,
      label: 'No, I don\'t wear makeup',
      description: 'I rarely or never use makeup products',
      icon: <X className="w-6 h-6" />,
      bgColor: 'bg-gray-50 hover:bg-gray-100/80'
    }
  ];

  const makeupTypeOptions = [
    { value: 'FOUNDATION', label: 'Foundation', icon: '👩' },
    { value: 'CONCEALER', label: 'Concealer', icon: '💄' },
    { value: 'POWDER', label: 'Powder', icon: '🧪' },
    { value: 'BLUSH', label: 'Blush', icon: '🎨' },
    { value: 'EYESHADOW', label: 'Eyeshadow', icon: '👁️' },
    { value: 'MASCARA', label: 'Mascara', icon: '👀' },
    { value: 'LIPSTICK', label: 'Lipstick', icon: '💋' },
    { value: 'EYELINER', label: 'Eyeliner', icon: '✍️' }
  ];

  const frequencyOptions = [
    {
      value: 'DAILY',
      label: 'Daily Wear',
      description: 'I wear makeup every day',
      icon: <Clock className="w-6 h-6" />,
      bgColor: 'bg-violet-50 hover:bg-violet-100/80'
    },
    {
      value: 'FEW_TIMES_WEEK',
      label: 'Few Times a Week',
      description: '3-4 times per week',
      icon: <Clock className="w-6 h-6" />,
      bgColor: 'bg-violet-50 hover:bg-violet-100/80'
    },
    {
      value: 'WEEKENDS_ONLY',
      label: 'Weekends Only',
      description: 'Mainly on weekends',
      icon: <Clock className="w-6 h-6" />,
      bgColor: 'bg-violet-50 hover:bg-violet-100/80'
    },
    {
      value: 'SPECIAL_OCCASIONS',
      label: 'Special Occasions',
      description: 'Only for events or occasions',
      icon: <Clock className="w-6 h-6" />,
      bgColor: 'bg-violet-50 hover:bg-violet-100/80'
    }
  ];

  const handleSectionComplete = (section: keyof typeof completedSections, value: any) => {
    setCompletedSections(prev => ({
      ...prev,
      [section]: true
    }));
    form.setValue(section, value);
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
      <CardHeader>
        <CardTitle>Your Makeup Routine</CardTitle>
        <CardDescription>
          Help us understand your makeup habits to provide better skincare recommendations
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-8">
            {/* Wears Makeup Section */}
            <div className={sections.wearsMakeup.containerClass}>
              <FormField
                control={form.control}
                name="wearsMakeup"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-6">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        {sections.wearsMakeup.title}
                        {completedSections.wearsMakeup && (
                          <span className="flex items-center text-primary text-sm">
                            <Check className="w-4 h-4 mr-1" /> Selected
                          </span>
                        )}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {sections.wearsMakeup.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wearsMakeupOptions.map((option) => (
                        <Card
                          key={String(option.value)}
                          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                            field.value === option.value 
                              ? 'ring-2 ring-primary shadow-lg transform' 
                              : 'hover:shadow-md'
                          } ${option.bgColor}`}
                          onClick={() => handleSectionComplete('wearsMakeup', option.value)}
                        >
                          <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className={sections.wearsMakeup.iconClass}>
                              {option.icon}
                            </div>
                            <h3 className="font-semibold mt-4">{option.label}</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {option.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Makeup Types Section - Only show if wearsMakeup is true */}
            {completedSections.wearsMakeup && form.getValues('wearsMakeup') && (
              <div className={sections.makeupTypes.containerClass}>
                <FormField
                  control={form.control}
                  name="makeupTypes"
                  render={() => (
                    <FormItem>
                      <div className="mb-6">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                          {sections.makeupTypes.title}
                          {completedSections.makeupTypes && (
                            <span className="flex items-center text-primary text-sm">
                              <Check className="w-4 h-4 mr-1" /> Selected
                            </span>
                          )}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {sections.makeupTypes.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {makeupTypeOptions.map((option) => (
                          <Card
                            key={option.value}
                            className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                              selectedMakeupTypes.includes(option.value)
                                ? 'ring-2 ring-primary shadow-lg transform bg-purple-100'
                                : 'hover:shadow-md bg-purple-50'
                            }`}
                            onClick={() => handleMakeupTypeToggle(option.value)}
                          >
                            <CardContent className="p-4 flex flex-col items-center text-center">
                              <span className="text-2xl mb-2">{option.icon}</span>
                              <h3 className="font-semibold text-sm">{option.label}</h3>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Frequency Section - Only show if makeupTypes are selected */}
            {completedSections.makeupTypes && selectedMakeupTypes.length > 0 && (
              <div className={sections.frequency.containerClass}>
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-6">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                          {sections.frequency.title}
                          {completedSections.frequency && (
                            <span className="flex items-center text-primary text-sm">
                              <Check className="w-4 h-4 mr-1" /> Selected
                            </span>
                          )}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {sections.frequency.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {frequencyOptions.map((option) => (
                          <Card
                            key={option.value}
                            className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                              field.value === option.value 
                                ? 'ring-2 ring-primary shadow-lg transform' 
                                : 'hover:shadow-md'
                            } ${option.bgColor}`}
                            onClick={() => handleSectionComplete('frequency', option.value)}
                          >
                            <CardContent className="p-4 flex flex-col items-center text-center">
                              <div className={sections.frequency.iconClass}>
                                {option.icon}
                              </div>
                              <h3 className="font-semibold mt-2">{option.label}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {option.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
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
              >
                Back
              </Button>
              <Button 
                type="submit" 
                disabled={!completedSections.wearsMakeup || 
                  (form.getValues('wearsMakeup') && (!completedSections.makeupTypes || !completedSections.frequency))}
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

export default MakeupQuestion;