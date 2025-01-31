export type SkincareFormData = {
  skinType?: "OILY" | "DRY" | "COMBINATION" | "SENSITIVE"
  skinGoal?: "ANTI_AGING" | "ACNE" | "HYDRATION" | "EVEN_TONE"
  acneType?: "HORMONAL" | "STRESS" | "CONGESTION"
  sunExposure?: "RARE" | "MODERATE" | "FREQUENT"
  climateType?: "ARID" | "HUMID" | "URBAN"
  exfoliationFrequency?: "NEVER" | "WEEKLY" | "DAILY"
  exfoliationType?: "PHYSICAL_SCRUBS" | "CHEMICAL_EXFOLIANTS" | "ENZYME_EXFOLIATORS"
  ageGroup?: "TWENTIES" | "THIRTIES" | "FORTIES" | "FIFTIES" | "SIXTIES_PLUS"
  blacklistedIngredients?: string[]
  texturePreference?: "LIGHTWEIGHT" | "RICH" | "NO_PREFERENCE"
  packagingPreference?: "ECO_REFILL" | "AIRLESS_PUMP" | "STANDARD"
  makeupTypes?: ("FOUNDATION" | "CONCEALER" | "BLUSH" | "EYESHADOW" | "EYELINER" | "MASCARA" | "LIPSTICK" | "LIP_GLOSS" | "LIP_STAIN")[]
  makeupFrequency?: 'DAILY' | 'FEW_TIMES_WEEK' | 'WEEKENDS_ONLY' | 'SPECIAL_OCCASIONS'
  ethicalPreferences?: ("NONE"|"CRUELTY_FREE" | "VEGAN" | "SUSTAINABLE_PACKAGING" | "REEF_SAFE" | "PALM_OIL_FREE")[]
  stressLevels?: "LOW" | "MEDIUM" | "HIGH"
  sleepPatterns?: "LESS_THAN_6_HRS" | "6_TO_8_HRS" | "MORE_THAN_8_HRS"
  preferredIngredients?: ("HYALURONIC_ACID" | "VITAMIN_C" | "NIACINAMIDE" | "CERAMIDES" | "PEPTIDES" | "PANTHENOL" | "CENTELLA_ASIATICA")[]
  wearsMakeup?: boolean,
  avoidedIngredients?: ("PARABENS" | "SILICONES" | "MINERAL_OIL" | "ESSENTIAL_OILS")[]
  routineComplexity?: "LOW" | "MEDIUM" | "HIGH"
  monthlyBudget?: "LOW" | "MID_RANGE" | "LUXURY"
  hasPreferencesEthical?: boolean
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