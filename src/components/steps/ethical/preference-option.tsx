import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"

interface PreferenceOptionProps {
  icon: string
  label: string
  description: string
  isChecked: boolean
  onClick: () => void
}

export function PreferenceOption({ icon, label, description, isChecked, onClick }: PreferenceOptionProps) {
  return (
    <div
      className={`
        relative flex items-start space-x-3 rounded-xl p-4 cursor-pointer
        border-2 transition-all duration-300 ease-in-out
        ${isChecked
          ? 'border-primary bg-primary/10 shadow-md'
          : 'border-muted hover:border-primary/30 hover:bg-accent/20'
        }
      `}
      onClick={onClick}
    >
      <div className="flex-shrink-0">
        <div className={`
          h-6 w-6 rounded-md border-2 flex items-center justify-center
          ${isChecked 
            ? 'border-primary bg-primary text-white'
            : 'border-muted-foreground'}
        `}>
          {isChecked && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 13l4 4L19 7" />
            </motion.svg>
          )}
        </div>
      </div>
      <div className="space-y-1">
        <Label className="flex items-center gap-2 text-lg font-medium">
          <span>{icon}</span>
          {label}
        </Label>
        <p className="text-muted-foreground text-sm">
          {description}
        </p>
      </div>
    </div>
  )
} 