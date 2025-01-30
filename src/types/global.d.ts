export type SkincareFormData = {
  skinType?: "OILY" | "DRY" | "COMBINATION" | "SENSITIVE"
  skinGoals?: ("ANTI_AGING" | "ACNE" | "HYDRATION" | "EVEN_TONE")[]
  acneType?: "HORMONAL" | "STRESS" | "CONGESTION"
  sunExposureHours?: number
  climateType?: "ARID" | "HUMID" | "URBAN"
  wearsMakeupDaily?: boolean
  exfoliationFrequency?: "NEVER" | "WEEKLY" | "DAILY"
  exfoliationTolerance?: "LOW" | "MEDIUM" | "HIGH"
  ageGroup?: "TWENTIES" | "THIRTIES" | "FORTIES" | "FIFTIES" | "SIXTIES_PLUS"
  blacklistedIngredients?: string[]
  texturePreference?: "LIGHTWEIGHT" | "RICH" | "NO_PREFERENCE"
  packagingPreference?: "ECO_REFILL" | "AIRLESS_PUMP" | "STANDARD"
  ethicalPreferences?: ("NONE"|"CRUELTY_FREE" | "VEGAN" | "SUSTAINABLE_PACKAGING" | "REEF_SAFE" | "PALM_OIL_FREE")[]
  stressLevel?: number
  sleepHours?: number
  preferredIngredients?: ("HYALURONIC_ACID" | "VITAMIN_C" | "NIACINAMIDE" | "CERAMIDES" | "PEPTIDES" | "PANTHENOL" | "CENTELLA_ASIATICA")[]
  avoidedIngredients?: ("PARABENS" | "SILICONES" | "MINERAL_OIL" | "ESSENTIAL_OILS")[]
  routineComplexity?: "LOW" | "MEDIUM" | "HIGH"
  monthlyBudget?: number
  hasPreferences?: boolean
  routineTime?: {
    morning?: number
    evening?: number
  }
  budgetAllocation?: {
    cleansers?: number
    treatments?: number
    sunscreen?: number
  }
  sustainabilityPriorities?: ("CRUELTY_FREE" | "RECYCLABLE" | "VEGAN")[]
  productWarnings?: {
    code?: string
    message?: string
    affectedProducts?: string[]
  }[]
  selfieAnalysis?: {
    hydrationLevel?: number
    textureAnalysis?: string
    imageUrl?: string
  }
  skinConcerns?: {
    primary?: string
    secondary?: string
    historyOfReactions?: boolean
  }
  lifestyleFactors?: {
    stressLevel?: number
    sleepHours?: number
    dietaryRestrictions?: string[]
  }
  contactPreferences?: {
    email?: string
    phone?: string
    subscribeToTips?: boolean
  }
}