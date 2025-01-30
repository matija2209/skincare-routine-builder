import { ReactNode, useEffect, useState } from 'react'
import { useFormStore } from '@/lib/store'
import ClimateBackground from '../background/climate-background'

interface FormLayoutProps {
  children: ReactNode
}

export function FormLayout({ children }: FormLayoutProps) {
  const currentStep = useFormStore((state) => state.currentStep)
  const formData = useFormStore((state) => state.formData)
  const getLatestState = useFormStore((state) => state.getLatestState)
  const [climateType, setClimateType] = useState<"ARID" | "HUMID" | "URBAN" | undefined>(undefined)

  const totalSteps = 13

  useEffect(() => {
    const latestState = getLatestState()
    if (currentStep === 5) {
    setClimateType(latestState.formData.climateType)
    } else {
      setClimateType(undefined)
    }
  }, [getLatestState,formData,currentStep])

  return (
    <div className="min-h-screen bg-[hsl(35,38%,97%)] relative">
      {/* SVG Background Pattern with Logo */}
      {climateType && <ClimateBackground climateType={climateType} />}
      
      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex justify-between">
          <div className="text-sm font-medium text-[hsl(220,14%,24%)]">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="text-sm font-medium text-[hsl(220,14%,24%)]">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </div>
        </div>
        <div className="mb-8 overflow-hidden rounded-full bg-[hsl(300,12%,85%)]">
          <div
            className="h-2 rounded-full bg-[hsl(351,45%,65%)] transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="rounded-lg bg-white p-10 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  )
} 