import { useForm, FieldValues, DefaultValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useFormStore } from "@/lib/store"

interface UseFormStepProps<T extends FieldValues> {
  schema?: z.ZodSchema<T>
  currentStep: number
}

export function useFormStep<T extends FieldValues>({ 
  schema, 
  currentStep 
}: UseFormStepProps<T>) {
  const { setCurrentStep, setFormData, getLatestState } = useFormStore()

  const form = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onChange",
    defaultValues: getLatestState().formData as DefaultValues<T>,
  })

  const handleNext = (data: T) => {
    setFormData(data)
    setCurrentStep(currentStep + 1)
  }

  const handleNextOveride = (data: T, overideStep?: number) => {
    setFormData(data)
    setCurrentStep(overideStep || currentStep + 1)
  }

  const handleBack = () => {
    const currentValues = form.getValues()
    setFormData(currentValues)
    setCurrentStep(currentStep - 1)
  }

  return {
    form,
    setFormData,
    handleNext,
    handleBack,
    handleNextOveride
  }
} 