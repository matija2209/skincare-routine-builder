import { FormLayout } from "./components/layout/form-layout"
import SplashScreen from "./components/steps/splash-screen"
import SelectSkinType from "./components/steps/select-skin-type"
import SelectSkinGoals from "./components/steps/select-skin-goals"



import { useFormStore } from "./lib/store"

import EnvironmentalFactors from "./components/steps/environmental-factors"
import ExfoliationTolerance from "./components/steps/exofiliate-tolerance"
import { IngredientPreferences } from "./components/steps/ingredient-preferences"
import RoutineComplexity from "./components/steps/routine-complexity"
import BudgetAllocation from "./components/steps/budget-allocation"
import MakeupQuestion from "./components/steps/makeup-question"
import LifestyleFactors from "./components/steps/lifestyle-factors"
import AgeGroup from "./components/steps/age-group"
import FinalStep from "./components/steps/final-step"
import EthicalPreferences from "./components/steps/ethical-preferences"

function App() {
  const currentStep = useFormStore((state) => state.currentStep)

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SplashScreen />
      case 2:
        return <SelectSkinType step={2}/>
      case 3:
        return <SelectSkinGoals step={3}/>
      case 4:
        return <AgeGroup step={4}/>
      case 5:
        return <EnvironmentalFactors step={5}/>
      case 6:
        return <LifestyleFactors step={6}/>
      case 7: 
        return <ExfoliationTolerance step={7}/>
      case 8:
        return <IngredientPreferences step={8}/>
      case 9:
        return <RoutineComplexity step={9}/>
      case 10:
        return <BudgetAllocation step={10}/>
      case 11:
        return <EthicalPreferences step={11}/>
      case 12:
        return <MakeupQuestion step={12}/>
      case 13:
        return <FinalStep step={13}/>
      default:
        return <div>Step {currentStep} coming soon...</div>
    }
  }

  return (
    <FormLayout>
      {renderStep()}
    </FormLayout>
  )
}

export default App
