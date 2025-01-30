import { motion } from "framer-motion"
import { FormField, FormItem, FormMessage } from "@/components/ui/form"
import { PreferenceOption } from "./preference-option"
import { ethicalPreferencesOptions } from "./schema"
import type { UseFormReturn } from "react-hook-form"
import type { EthicalPreferencesForm } from "./schema"
import { CardTitle } from "@/components/ui/card"

interface PreferencesGridProps {
  form: UseFormReturn<EthicalPreferencesForm>
}

export function PreferencesGrid({ form }: PreferencesGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-6 overflow-hidden"
    >
      <CardTitle>
        Select Your Priorities
      </CardTitle>
      
      <FormField
        control={form.control}
        name="ethicalPreferences"
        render={() => (
          <FormItem>
            <div className="grid gap-4 md:grid-cols-2">
              {ethicalPreferencesOptions.map((option, index) => (
                <FormField
                  key={option.value}
                  control={form.control}
                  name="ethicalPreferences"
                  render={({ field }) => {
                    const isChecked = field.value?.includes(option.value as any)
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <PreferenceOption
                          icon={option.icon}
                          label={option.label}
                          description={option.description}
                          isChecked={isChecked}
                          onClick={() => {
                            isChecked
                              ? field.onChange(field.value?.filter(v => v !== option.value))
                              : field.onChange([...(field.value || []), option.value])
                          }}
                        />
                      </motion.div>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage className="text-center text-red-500 font-medium" />
          </FormItem>
        )}
      />
    </motion.div>
  )
} 