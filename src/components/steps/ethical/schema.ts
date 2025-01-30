import { z } from "zod"

export const ethicalPreferencesSchema = z.discriminatedUnion("hasPreferencesEthical", [
  z.object({
    hasPreferencesEthical: z.literal(true),
    ethicalPreferences: z.array(
      z.enum([
        "VEGAN", 
        "CRUELTY_FREE", 
        "SUSTAINABLE_PACKAGING", 
        "REEF_SAFE", 
        "PALM_OIL_FREE"
      ])
    ).min(1, "Select at least one ethical preference")
  }),
  z.object({
    hasPreferencesEthical: z.literal(false),
    ethicalPreferences: z.undefined()
  })
])

export type EthicalPreferencesForm = z.infer<typeof ethicalPreferencesSchema>

export const ethicalPreferencesOptions = [
  { 
    value: "VEGAN", 
    label: "Vegan", 
    description: "No animal-derived ingredients",
    icon: "🌱"
  },
  { 
    value: "CRUELTY_FREE", 
    label: "Cruelty-Free", 
    description: "No animal testing",
    icon: "🐇"
  },
  { 
    value: "SUSTAINABLE_PACKAGING", 
    label: "Sustainable Packaging", 
    description: "Environmentally friendly packaging",
    icon: "📦"
  },
  { 
    value: "REEF_SAFE", 
    label: "Reef Safe", 
    description: "Environmentally conscious marine protection",
    icon: "🐠"
  },
  { 
    value: "PALM_OIL_FREE", 
    label: "Palm Oil Free", 
    description: "Avoiding palm oil to protect rainforests",
    icon: "🌴"
  }
] 