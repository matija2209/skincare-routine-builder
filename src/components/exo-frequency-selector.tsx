import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Clock } from 'lucide-react';
import { exfoliationFrequencyOptions } from '@/lib/lifestyle-options';

const FrequencySelector = ({ form, handleSectionComplete }: { form: any, handleSectionComplete: any }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {exfoliationFrequencyOptions.map((option) => (
        <motion.div
          key={option.value}
          variants={item}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <div 
            className={cn(
              "relative flex items-center space-x-4 rounded-lg border p-4 cursor-pointer",
              "transition-all duration-300 ease-in-out",
              "group hover:bg-accent/5",
              form.getValues("exfoliationFrequency") === option.value 
                ? "ring-2 ring-primary shadow-lg scale-[1.02] border-primary bg-accent/10" 
                : "hover:shadow-md hover:border-primary/50"
            )}
            onClick={() => handleSectionComplete('exfoliationFrequency', option.value)}
          >
            <RadioGroupItem 
              value={option.value} 
              id={`freq-${option.value}`}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            <div className="flex items-center space-x-4 flex-1">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-accent/10 rounded-full shadow-sm relative overflow-hidden group-hover:bg-accent/20"
              >
                <Clock className="w-5 h-5 text-primary/70" />
                <motion.div
                  className="absolute inset-0 bg-primary/5"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>

              <Label 
                htmlFor={`freq-${option.value}`} 
                className="flex flex-col cursor-pointer flex-1 space-y-1"
              >
                <motion.span 
                  className="text-lg font-semibold group-hover:text-primary"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {option.label}
                </motion.span>
                <span className="text-muted-foreground transition-colors group-hover:text-primary/80">
                  {option.description}
                </span>
                <p className="mt-2 text-sm text-muted-foreground italic group-hover:text-primary/70">
                  {option.details}
                </p>
              </Label>

              <motion.div 
                className="absolute right-4 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={form.getValues("exfoliationFrequency") === option.value ? 
                  { scale: 1, opacity: 1 } : 
                  { scale: 0, opacity: 0 }
                }
              >
                <div className="h-1 w-1 rounded-full bg-primary shadow-lg" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FrequencySelector;