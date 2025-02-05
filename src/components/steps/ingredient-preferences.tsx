
import { z } from "zod";
import { useFormStep } from "@/hooks/use-form-step";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, 
  Ban,
} from "lucide-react";
import { avoidedIngredientsOptions, preferredIngredientsOptions } from '@/lib/lifestyle-options';
import IngredientCard from './ingredients/ingredient-choice';

const ingredientPreferencesSchema = z.object({
  preferredIngredients: z.array(
    z.enum([
      "HYALURONIC_ACID",
      "VITAMIN_C",
      "NIACINAMIDE",
      "CERAMIDES",
      "PEPTIDES",
      "PANTHENOL",
      "CENTELLA_ASIATICA"
    ])
  ).min(1, "Select at least one preferred ingredient").optional(),
  avoidedIngredients: z.array(
    z.enum([
      "FRAGRANCE",
      "ALCOHOL",
      "SULFATES",
      "PARABENS",
      "SILICONES",
      "MINERAL_OIL",
      "ESSENTIAL_OILS"
    ])
  ).optional()
});


export function IngredientPreferences({step}: {step: number}) {
  const { form, handleBack, handleNext } = useFormStep({
    schema: ingredientPreferencesSchema,
    currentStep: step,
  });

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Ingredient Preferences</CardTitle>
        <CardDescription className="text-lg">
          Select ingredients you prefer or want to avoid in your skincare products.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)} className="space-y-8">
            {/* Preferred Ingredients Section */}
            <div className="rounded-xl bg-green-50/50 p-6">
              <FormField
                control={form.control}
                name="preferredIngredients"
                render={() => (
                  <FormItem>
                    <div className="flex items-center space-x-2 mb-6">
                      <Sparkles className="h-6 w-6 text-green-600" />
                      <CardTitle className=''>Preferred Ingredients</CardTitle>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {preferredIngredientsOptions.map((option) => (
                        <FormField
                          key={option.value}
                          control={form.control}
                          name="preferredIngredients"
                          render={({ field }) => (
                            <IngredientCard
                              icon={option.icon}
                              label={option.label}
                              description={option.description}
                              checked={field.value?.includes(option.value as "HYALURONIC_ACID" | "VITAMIN_C" | "NIACINAMIDE" | "CERAMIDES" | "PEPTIDES" | "PANTHENOL" | "CENTELLA_ASIATICA")}
                              onCheckedChange={(checked: boolean) => {
                                const currentValue = field.value || [];
                                const newValue = checked
                                  ? [...currentValue, option.value]
                                  : currentValue.filter(value => value !== option.value);
                                field.onChange(newValue);
                              }}
                              variant="preferred"
                            />
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-8" />

            {/* Avoided Ingredients Section */}
            <div className="rounded-xl bg-red-50/50 p-6">
              <FormField
                control={form.control}
                name="avoidedIngredients"
                render={() => (
                  <FormItem>
                    <div className="flex items-center space-x-2 mb-6">
                      <Ban className="h-6 w-6 text-red-600" />
                      <CardTitle>Ingredients to Avoid</CardTitle>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {avoidedIngredientsOptions.map((option) => (
                        <FormField
                          key={option.value}
                          control={form.control}
                          name="avoidedIngredients"
                          render={({ field }) => (
                            <IngredientCard
                              icon={option.icon}
                              label={option.label}
                              description={option.description}
                              checked={field.value?.includes(option.value as "FRAGRANCE" | "ALCOHOL" | "SULFATES" | "PARABENS" | "SILICONES" | "MINERAL_OIL" | "ESSENTIAL_OILS")}
                              onCheckedChange={(checked: boolean) => {
                                const currentValue = field.value || [];
                                const newValue = checked
                                  ? [...currentValue, option.value]
                                  : currentValue.filter(value => value !== option.value);
                                field.onChange(newValue);
                              }}
                              variant="avoid"
                            />
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between pt-6">
              <Button back type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" front>Continue</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default IngredientPreferences;