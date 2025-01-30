START
│
├── 1. SKIN TYPE (Required)
│   └─ Options: OILY, DRY, COMBINATION, SENSITIVE
│
├── 2. SKIN GOALS (Required)
│   ├─ Primary Goals: ANTI_AGING, HYDRATION, BRIGHTENING, PORE_MINIMIZATION
│   └─ Conditional Branch:
│      └─ If ACNE selected → Show ACNE TYPE SUB-STEP
│         └─ Options: HORMONAL, STRESS_RELATED, CONGESTION
│
├── 3. ENVIRONMENT (Required)
│   └─ Options: ARID, HUMID, POLLUTED_URBAN
│
├── 4. LIFESTYLE (Required)
│   ├─ sunExposure: RARE, MODERATE, FREQUENT
│   ├─ stressLevels: LOW, MEDIUM, HIGH
│   └─ sleepPatterns: LESS_THAN_6_HRS, 6_TO_8_HRS, MORE_THAN_8_HRS
│
└── 5. EXFOLIATION TOLERANCE (Conditional)
    ├─ Branch 1: NEVER → No additional input
    └─ Branch 2: WEEKLY/TWO_TO_THREE_TIMES_WEEK → Show TYPE SELECTION
       └─ Options: PHYSICAL_SCRUBS, CHEMICAL_EXFOLIANTS, ENZYME_EXFOLIATORS