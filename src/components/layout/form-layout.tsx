import React, { ReactNode, useEffect, useState } from 'react'
import { useFormStore } from '@/lib/store'
import ClimateBackground from '../background/climate-background'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

interface FormLayoutProps {
  children: ReactNode
  currentStep?: number
}

export const FormLayout: React.FC<FormLayoutProps> = ({ 
  children, 
  currentStep 
}) => {
  const storeCurrentStep = useFormStore((state) => state.currentStep)
  const formData = useFormStore((state) => state.formData)
  const getLatestState = useFormStore((state) => state.getLatestState)
  const [climateType, setClimateType] = useState<"ARID" | "HUMID" | "URBAN" | undefined>(undefined)
  const { scrollContainerRef, handleStepChange } = useSmoothScroll()

  // Use store step if not provided
  const activeStep = currentStep ?? storeCurrentStep
  const totalSteps = 13

  useEffect(() => {
    const latestState = getLatestState()
    if (activeStep === 5) {
      setClimateType(latestState.formData.climateType)
    } else {
      setClimateType(undefined)
    }
  }, [getLatestState, formData, activeStep])

  // Trigger scroll when step changes
  useEffect(() => {
    handleStepChange(activeStep)
  }, [activeStep, handleStepChange])

  return (
    <div className="min-h-screen bg-[hsl(35,38%,97%)] relative flex flex-col">
      {/* SVG Background Pattern with Logo */}
      {climateType && <ClimateBackground climateType={climateType} />}
      
      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl w-full flex-grow flex flex-col px-2 py-2 md:px-6 md:py-10">
        <div className="mb-2 flex justify-between opacity-50 text-xs">
          <div className="font-light text-foreground-muted">
            Step {activeStep} / {totalSteps}
          </div>
          <div className="font-light text-foreground-muted">
            {Math.round((activeStep / totalSteps) * 100)}%
          </div>
        </div>
        <div className="mb-4 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-1 rounded-full bg-primary/50 transition-all duration-500"
            style={{ width: `${(activeStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="flex-grow rounded-lg bg-white p-2 md:p-10 shadow-xl flex flex-col">
          <div 
            ref={scrollContainerRef}
            className="w-full h-full overflow-y-auto scroll-smooth"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 