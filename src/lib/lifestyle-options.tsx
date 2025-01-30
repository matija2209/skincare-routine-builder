
import {  FlaskConical, Brush, Moon, Apple, Circle, Clock, X, Palette } from 'lucide-react';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Sparkles, 
  Shield, 

  Waves,
  Heart,
  Leaf,
  AlertCircle,
  XCircle,
  Ban,
  AlertTriangle,
  ShieldOff,
  XOctagon,
  Wind,

} from "lucide-react";


// Add these SVG components at the top level
const WaveSVG = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <motion.path
        d="M0 60 Q 25 40, 50 60 T 100 60 V100 H0 Z"
        fill="currentColor"
        initial={{ d: "M0 60 Q 25 40, 50 60 T 100 60 V100 H0 Z" }}
        animate={{
          d: [
            "M0 60 Q 25 40, 50 60 T 100 60 V100 H0 Z",
            "M0 60 Q 25 50, 50 40 T 100 60 V100 H0 Z",
            "M0 60 Q 25 40, 50 60 T 100 60 V100 H0 Z"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
  
  const SunSVG = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <motion.circle
        cx="50"
        cy="50"
        r="20"
        fill="currentColor"
        animate={{ r: [18, 22, 18] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.g
        stroke="currentColor"
        strokeWidth="3"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ originX: "50px", originY: "50px" }}
      >
        <line x1="50" y1="10" x2="50" y2="30" />
        <line x1="50" y1="70" x2="50" y2="90" />
        <line x1="10" y1="50" x2="30" y2="50" />
        <line x1="70" y1="50" x2="90" y2="50" />
      </motion.g>
    </svg>
  );
  
  const FlameSVG = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <motion.path
        fill="currentColor"
        initial={{ d: "M50 90 Q30 70, 40 50 Q35 30, 50 10 Q65 30, 60 50 Q70 70, 50 90 Z" }}
        animate={{
          d: [
            "M50 90 Q30 70, 40 50 Q35 30, 50 10 Q65 30, 60 50 Q70 70, 50 90 Z",
            "M50 92 Q32 72, 42 52 Q36 28, 50 8 Q64 28, 58 52 Q68 72, 50 92 Z",
            "M50 90 Q30 70, 40 50 Q35 30, 50 10 Q65 30, 60 50 Q70 70, 50 90 Z"
          ]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  );
  
  // Add these SVG components after the existing ones
  
  const RareSunSVG = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <motion.circle 
        cx="30" 
        cy="30" 
        r="15" 
        fill="#F5C86D"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.g
        initial={{ x: -10 }}
        animate={{ x: 10 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      >
        <ellipse cx="50" cy="50" rx="25" ry="15" fill="currentColor"/>
        <ellipse cx="65" cy="55" rx="20" ry="12" fill="currentColor"/>
      </motion.g>
    </svg>
  );
  
  const ModerateSunSVG = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <motion.circle 
        cx="50" 
        cy="35" 
        r="18" 
        fill="#FFC93C"
        animate={{ r: [17, 20, 17] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.ellipse 
        cx="60" 
        cy="55" 
        rx="22" 
        ry="14" 
        fill="currentColor"
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </svg>
  );
  
  const FrequentSunSVG = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <motion.circle 
        cx="50" 
        cy="50" 
        r="20" 
        fill="#FFB400"
        animate={{ r: [18, 22, 18] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.g
        stroke="#FFB400"
        strokeWidth="3"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ originX: "50px", originY: "50px" }}
      >
        <line x1="50" y1="10" x2="50" y2="25"/>
        <line x1="50" y1="75" x2="50" y2="90"/>
        <line x1="10" y1="50" x2="25" y2="50"/>
        <line x1="75" y1="50" x2="90" y2="50"/>
      </motion.g>
    </svg>
  );
  
  
  // Add this component for the animated particles
  const SunParticles = ({ type }: { type: string }) => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full",
              type === "sun" && "bg-yellow-200/30",
              type === "rain" && "bg-blue-200/30",
              type === "clouds" && "bg-gray-200/30"
            )}
            initial={{ 
              x: Math.random() * 100 + "%",
              y: -10,
              opacity: 0 
            }}
            animate={{ 
              y: "110%",
              opacity: type === "clouds" ? [0, 1, 0] : 1
            }}
            transition={{
              duration: type === "sun" ? 2 : type === "clouds" ? 4 : 1,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: type === "clouds" ? "easeInOut" : "linear"
            }}
            style={{
              scale: type === "clouds" ? 1 + Math.random() * 2 : 1
            }}
          />
        ))}
      </div>
    );
  };
  

const sunExposureOptions = [
    {
      value: 'RARE',
      label: 'Rare Sun Exposure',
      description: 'Minimal time spent outdoors',
      icon: <RareSunSVG />,
      effects: ["Lower Vitamin D", "Less sun damage", "Minimal tanning"],
      recommendations: ["Vitamin D supplements", "Gentle UV protection"],
      theme: {
        background: "from-sky-900 to-sky-950",
        color: "text-sky-400",
        glow: "shadow-[0_0_30px_#38bdf8]",
        particles: "rain"
      }
    },
    {
      value: 'MODERATE',
      label: 'Moderate Sun Exposure',
      description: 'Occasional outdoor activities',
      icon: <ModerateSunSVG />,
      effects: ["Balanced Vitamin D", "Some UV exposure", "Natural glow"],
      recommendations: ["Daily SPF", "Antioxidants"],
      theme: {
        background: "from-amber-800 to-amber-950",
        color: "text-amber-400",
        glow: "shadow-[0_0_40px_#fbbf24]",
        particles: "clouds"
      }
    },
    {
      value: 'FREQUENT',
      label: 'Frequent Sun Exposure',
      description: 'Regular time in direct sunlight',
      icon: <FrequentSunSVG />,
      effects: ["High UV exposure", "Accelerated aging", "Increased pigmentation"],
      recommendations: ["High SPF", "Extra hydration"],
      theme: {
        background: "from-orange-700 to-orange-950",
        color: "text-orange-400",
        glow: "shadow-[0_0_50px_#f97316]",
        particles: "sun"
      }
    }
  ];

  const stressLevelOptions = [
    {
      value: 'LOW',
      label: 'Low Stress',
      description: 'Generally relaxed, handles pressure well',
      icon: <WaveSVG />,
      effects: ["Balanced skin", "Natural glow", "Even tone"],
      recommendations: ["Maintain routine", "Gentle care"],
      theme: {
        background: "from-teal-900 to-teal-950",
        color: "text-teal-400",
        glow: "shadow-[0_0_30px_#2dd4bf]"
      }
    },
    {
      value: 'MEDIUM',
      label: 'Moderate Stress',
      description: 'Occasional stress from work/life',
      icon: <SunSVG />,
      effects: ["Mild sensitivity", "Occasional breakouts", "Dull complexion"],
      recommendations: ["Calming products", "Stress relief"],
      theme: {
        background: "from-amber-900 to-amber-950",
        color: "text-amber-400",
        glow: "shadow-[0_0_30px_#fbbf24]"
      }
    },
    {
      value: 'HIGH',
      label: 'High Stress',
      description: 'Frequently feeling overwhelmed',
      icon: <FlameSVG />,
      effects: ["Inflammation", "Frequent breakouts", "Uneven texture"],
      recommendations: ["Intensive care", "Barrier repair"],
      theme: {
        background: "from-red-900 to-red-950",
        color: "text-red-400",
        glow: "shadow-[0_0_30px_#ef4444]"
      }
    }
  ];

  const sleepPatternOptions = [
    {
      value: 'LESS_THAN_6_HRS',
      label: 'Light Sleeper',
      description: 'Less than 6 hours per night',
      icon: <Moon className="w-6 h-6" />,
      effects: ["Increased dark circles", "Slower skin recovery", "Stress signs"],
      recommendations: ["Night repair", "De-puffing care"],
      theme: {
        background: "from-purple-900 to-purple-950",
        moonColor: "from-[#E6E6FA] to-[#D8BFD8]",
        moonGlow: "shadow-[0_0_30px_#9370DB]",
        starCount: 10
      }
    },
    {
      value: '6_TO_8_HRS',
      label: 'Average Sleeper',
      description: '6-8 hours per night',
      icon: <Moon className="w-6 h-6 text-yellow-500" />,
      effects: ["Normal skin cycle", "Average recovery", "Balanced rest"],
      recommendations: ["Maintenance", "Gentle repair"],
      theme: {
        background: "from-blue-900 to-blue-950",
        moonColor: "from-[#F8F8FF] to-[#E6E6FA]",
        moonGlow: "shadow-[0_0_40px_#6495ED]",
        starCount: 20
      }
    },
    {
      value: 'MORE_THAN_8_HRS',
      label: 'Sound Sleeper',
      description: 'More than 8 hours per night',
      icon: <Moon className="w-6 h-6 text-primary" />,
      effects: ["Optimal skin repair", "Natural regeneration", "Stress recovery"],
      recommendations: ["Deep hydration", "Recovery boost"],
      theme: {
        background: "from-[#0f1729] to-[#1a2b4d]",
        moonColor: "from-[#ECF6FF] to-[#D1E5FF]",
        moonGlow: "shadow-[0_0_50px_#4A6CF7]",
        starCount: 30
      }
    }
  ];


// Add these section configurations at the top level
const lifestyleFactors = {
  sunExposure: {
    title: "Daily Sun Exposure",
    description: "Understanding your sun exposure helps us recommend appropriate UV protection",
    containerClass: "bg-gradient-to-b from-amber-50/50 to-transparent p-6 rounded-lg border border-amber-100",
    iconClass: "text-amber-500"
  },
  stressLevels: {
    title: "Stress Management",
    description: "Stress can significantly impact your skin's health and appearance",
    containerClass: "bg-gradient-to-b from-rose-50/50 to-transparent p-6 rounded-lg border border-rose-100",
    iconClass: "text-rose-500"
  },
  sleepPatterns: {
    title: "Sleep Habits",
    description: "Quality sleep is essential for skin regeneration and repair",
    containerClass: "bg-gradient-to-b from-sky-50/50 to-transparent p-6 rounded-lg border border-sky-100",
    iconClass: "text-sky-500"
  }
};

const exfoliationFrequencyOptions = [
  { 
    value: "NEVER", 
    label: "Never", 
    description: "No current exfoliation routine",
    icon: Circle,
    details: "Best for extremely sensitive skin or those new to skincare routines"
  },
  { 
    value: "WEEKLY", 
    label: "Weekly", 
    description: "Occasional gentle exfoliation",
    icon: Circle,
    details: "Ideal for sensitive or normal skin types seeking balanced maintenance"
  },
  { 
    value: "TWO_TO_THREE_TIMES_WEEK", 
    label: "2-3 times a week", 
    description: "Regular exfoliation routine",
    icon: Circle,
    details: "Perfect for oily or combination skin types requiring frequent cell turnover"
  }
];

const exfoliationTypeOptions = [
  { 
    value: "PHYSICAL_SCRUBS", 
    label: "Physical Scrubs", 
    description: "Mechanical exfoliation with granular particles",
    icon: Brush,
    details: "Best for: Oily skin, thick skin texture. Use with gentle pressure in circular motions.",
    gradient: "from-blue-50 to-blue-100"
  },
  { 
    value: "CHEMICAL_EXFOLIANTS", 
    label: "Chemical Exfoliants (AHAs/BHAs)", 
    description: "Acid-based exfoliation for deeper skin renewal",
    icon: FlaskConical,
    details: "Best for: Aging concerns, hyperpigmentation. Start with lower concentrations.",
    gradient: "from-purple-50 to-purple-100"
  },
  { 
    value: "ENZYME_EXFOLIATORS", 
    label: "Enzyme Exfoliators", 
    description: "Gentle protein-based exfoliation",
    icon: Apple,
    details: "Best for: Sensitive skin, rosacea-prone. Natural option derived from fruits.",
    gradient: "from-green-50 to-green-100"
  }
];


const preferredIngredientsOptions = [
  { 
    value: "HYALURONIC_ACID",
    label: "Hyaluronic Acid",
    description: "Intense hydration and moisture retention",
    icon: Droplets
  },
  { 
    value: "VITAMIN_C",
    label: "Vitamin C",
    description: "Brightening and antioxidant protection",
    icon: Sparkles
  },
  { 
    value: "NIACINAMIDE",
    label: "Niacinamide",
    description: "Pore refinement and oil control",
    icon: Shield
  },
  { 
    value: "CERAMIDES",
    label: "Ceramides",
    description: "Skin barrier repair and protection",
    icon: FlaskConical
  },
  { 
    value: "PEPTIDES",
    label: "Peptides",
    description: "Collagen production and anti-aging",
    icon: Waves
  },
  { 
    value: "PANTHENOL",
    label: "Panthenol",
    description: "Soothing and hydrating properties",
    icon: Heart
  },
  { 
    value: "CENTELLA_ASIATICA",
    label: "Centella Asiatica",
    description: "Healing and calming skin inflammation",
    icon: Leaf
  }
];

const avoidedIngredientsOptions = [
  { 
    value: "FRAGRANCE",
    label: "Fragrance",
    description: "Potential irritant and allergen",
    icon: AlertCircle
  },
  { 
    value: "ALCOHOL",
    label: "Alcohol",
    description: "Can be drying and irritating",
    icon: XCircle
  },
  { 
    value: "SULFATES",
    label: "Sulfates",
    description: "Harsh cleansing agents",
    icon: Ban
  },
  { 
    value: "PARABENS",
    label: "Parabens",
    description: "Controversial preservatives",
    icon: AlertTriangle
  },
  { 
    value: "SILICONES",
    label: "Silicones",
    description: "Can clog pores and prevent absorption",
    icon: ShieldOff
  },
  { 
    value: "MINERAL_OIL",
    label: "Mineral Oil",
    description: "Potentially pore-clogging",
    icon: XOctagon
  },
  { 
    value: "ESSENTIAL_OILS",
    label: "Essential Oils",
    description: "Can cause skin sensitivity",
    icon: Wind
  }
];

const wearsMakeupOptions = [
  {
    value: true,
    label: 'Yes, I wear makeup',
    description: 'I use makeup products regularly',
    icon: <Palette className="w-6 h-6" />,
    bgColor: 'bg-pink-50 hover:bg-pink-100/80'
  },
  {
    value: false,
    label: 'No, I don\'t wear makeup',
    description: 'I rarely or never use makeup products',
    icon: <X className="w-6 h-6" />,
    bgColor: 'bg-gray-50 hover:bg-gray-100/80'
  }
];

const makeupTypeOptions = [
  { value: 'FOUNDATION', label: 'Foundation', icon: '👩' },
  { value: 'CONCEALER', label: 'Concealer', icon: '💄' },
  { value: 'POWDER', label: 'Powder', icon: '🧪' },
  { value: 'BLUSH', label: 'Blush', icon: '🎨' },
  { value: 'EYESHADOW', label: 'Eyeshadow', icon: '👁️' },
  { value: 'MASCARA', label: 'Mascara', icon: '👀' },
  { value: 'LIPSTICK', label: 'Lipstick', icon: '💋' },
  { value: 'EYELINER', label: 'Eyeliner', icon: '✍️' }
];

const frequencyOptions = [
  {
    value: 'DAILY',
    label: 'Daily Wear',
    description: 'I wear makeup every day',
    icon: <Clock className="w-6 h-6" />,
    bgColor: 'bg-violet-50 hover:bg-violet-100/80'
  },
  {
    value: 'FEW_TIMES_WEEK',
    label: 'Few Times a Week',
    description: '3-4 times per week',
    icon: <Clock className="w-6 h-6" />,
    bgColor: 'bg-violet-50 hover:bg-violet-100/80'
  },
  {
    value: 'WEEKENDS_ONLY',
    label: 'Weekends Only',
    description: 'Mainly on weekends',
    icon: <Clock className="w-6 h-6" />,
    bgColor: 'bg-violet-50 hover:bg-violet-100/80'
  },
  {
    value: 'SPECIAL_OCCASIONS',
    label: 'Special Occasions',
    description: 'Only for events or occasions',
    icon: <Clock className="w-6 h-6" />,
    bgColor: 'bg-violet-50 hover:bg-violet-100/80'
  }
];

const makeupSection = {
  wearsMakeup: {
    title: "Makeup Usage",
    description: "Tell us about your makeup habits to better understand your skincare needs",
    containerClass: "bg-gradient-to-b from-pink-50/50 to-transparent p-6 rounded-lg border border-pink-100",
    iconClass: "text-pink-500"
  },
  makeupTypes: {
    title: "Types of Makeup",
    description: "Select all the makeup products you regularly use",
    containerClass: "bg-gradient-to-b from-purple-50/50 to-transparent p-6 rounded-lg border border-purple-100",
    iconClass: "text-purple-500"
  },
  frequency: {
    title: "Application Frequency",
    description: "How often do you typically wear makeup?",
    containerClass: "bg-gradient-to-b from-violet-50/50 to-transparent p-6 rounded-lg border border-violet-100",
    iconClass: "text-violet-500"
  }
};

const skinGoalOptions = [
  { 
    value: "ANTI_AGING", 
    label: "Anti-Aging", 
    description: "Reduce fine lines and wrinkles",
    icon: "✨",
    illustration: (
      <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
        <span className="text-2xl">✨</span>
      </div>
    )
  },
  { 
    value: "ACNE", 
    label: "Acne Control", 
    description: "Prevent and treat breakouts",
    icon: "🔍",
    illustration: (
      <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
        <span className="text-2xl">🔍</span>
      </div>
    )
  },
  { 
    value: "HYDRATION", 
    label: "Hydration Boost", 
    description: "Improve moisture retention",
    icon: "💧",
    illustration: (
      <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
        <span className="text-2xl">💧</span>
      </div>
    )
  },
  { 
    value: "BRIGHTENING", 
    label: "Brightening", 
    description: "Reduce dark spots and discoloration",
    icon: "✨",
    illustration: (
      <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
        <span className="text-2xl">✨</span>
      </div>
    )
  },
  { 
    value: "PORE_MINIMIZATION", 
    label: "Pore Minimization", 
    description: "Refine and reduce visible pores",
    icon: "⭐",
    illustration: (
      <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
        <span className="text-2xl">⭐</span>
      </div>
    )
  }
]


  export {
    sunExposureOptions,
    stressLevelOptions,
    sleepPatternOptions,
    lifestyleFactors,
    exfoliationFrequencyOptions,
    exfoliationTypeOptions,
    WaveSVG,
    SunSVG,
    FlameSVG,
    RareSunSVG,
    ModerateSunSVG,
    FrequentSunSVG,
    SunParticles,
    preferredIngredientsOptions,
    avoidedIngredientsOptions,
    makeupTypeOptions,
    frequencyOptions,
    wearsMakeupOptions,
    makeupSection,
    skinGoalOptions
  }