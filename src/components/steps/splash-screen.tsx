import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { useFormStore } from "@/lib/store"

import { motion } from 'framer-motion';
import { Droplet, FlaskConicalOff, Leaf, Sparkles } from "lucide-react";

function SplashScreen() {
  const setCurrentStep = useFormStore((state) => state.setCurrentStep)

  const handleStart = () => {
    setCurrentStep(2)
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Floating bubbles animation
  const Bubbles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-full bg-white/10"
            initial={{ 
              y: "100%", 
              x: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{
              y: "-100%",
              transition: {
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="border-none shadow-none ">
              <CardTitle className="text-4xl font-serif mb-4 text-center">
                Your Personalized Skincare Starts Here
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 text-center">
                Free skin assessment in under a minute!
              </CardDescription>
      <CardContent className="space-y-6">
        <Bubbles></Bubbles>
      <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 max-w-2xl mx-auto"
          >
      

            <motion.div variants={itemVariants} className="text-center text-gray-600">
              Get tailored skincare recommendations based on your skin type, routine & goals.
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Leaf className="w-6 h-6" />, text: "Understand your skin needs better" },
                { icon: <Droplet className="w-6 h-6" />, text: "Balance your skincare routine effectively" },
                { icon: <Sparkles className="w-6 h-6" />, text: "Avoid harmful ingredients tailored to you" },
                { icon: <FlaskConicalOff className="w-6 h-6" />, text: "Science-backed recommendations" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-gray-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-primary">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="text-center"
            >
              <Button
                className="  text-white px-8 py-6 text-lg rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={handleStart}
              >
                Start Your Assessment →
              </Button>
            </motion.div>
          </motion.div>
      </CardContent>
    </Card>
  )
} 

export default SplashScreen