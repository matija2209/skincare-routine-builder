import React from 'react';
import { z } from "zod";
import { useFormStep } from "@/lib/hooks/use-form-step";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, 
  Ban,
} from "lucide-react";
import { avoidedIngredientsOptions, preferredIngredientsOptions } from '@/lib/lifestyle-options';

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

const IngredientCard = ({ 
  icon: Icon, 
  label, 
  description, 
  checked, 
  onCheckedChange, 
  variant = "preferred" 
}: {
  icon: React.ElementType,
  label: string,
  description: string,
  checked: boolean | undefined,
  onCheckedChange: (checked: boolean) => void,
  variant: "preferred" | "avoid"
}) => (
  <div 
    className={`relative overflow-hidden transition-all duration-200 ${
      checked 
        ? variant === "preferred" 
          ? "bg-green-50 border-green-200" 
          : "bg-red-50 border-red-200"
        : "hover:bg-accent"
    } rounded-lg border p-4`}
  >
    <div className="flex items-start space-x-4">
      <div className={`p-2 rounded-full ${
        variant === "preferred" 
          ? "bg-green-100 text-green-600" 
          : "bg-red-100 text-red-600"
      }`}>
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <Label className="flex flex-col cursor-pointer" onClick={() => onCheckedChange(!checked)}>
          <span className="font-semibold">{label}</span>
          <span className="text-sm text-muted-foreground">{description}</span>
        </Label>
      </div>
      <Checkbox 
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={`mt-1 ${
          checked && variant === "preferred" 
            ? "border-green-500 bg-green-500 text-white" 
            : checked && variant === "avoid" 
              ? "border-red-500 bg-red-500 text-white" 
              : ""
        }`}
      />
    </div>
  </div>
);

export function IngredientPreferences({step}: {step: number}) {
  const { form, handleBack, handleNext } = useFormStep({
    schema: ingredientPreferencesSchema,
    currentStep: step,
  });

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Ingredient Preferences</CardTitle>
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
                      <CardTitle>Preferred Ingredients</CardTitle>
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
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default IngredientPreferences;