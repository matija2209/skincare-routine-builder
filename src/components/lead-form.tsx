import { useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useForm as useFormspree, ValidationError } from '@formspree/react';
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, Stars } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Define the form schema
const formSchema = z.object({
  website: z.string().url({ message: "Please enter a valid website URL" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type FormValues = z.infer<typeof formSchema>

function LeadForm() {
  const { toast } = useToast();
  const [formspreeState, handleFormspreeSubmit] = useFormspree("meoekewe"); // Replace with your form ID

  // Initialize form with React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "",
      email: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await handleFormspreeSubmit({
        email: data.email,
        website: data.website,
      });
      
      if (formspreeState.errors) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "There was a problem submitting your form. Please try again.",
        });
        return;
      }
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
      });
    }
  };

  // Animation variants matching splash screen
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const FloatingElements = () => {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ 
              y: "100vh",
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360
            }}
            animate={{
              y: "-100vh",
              rotate: Math.random() * 360,
              transition: {
                duration: Math.random() * 8 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }
            }}
          >
            {i % 2 === 0 ? 
              <Stars className="w-4 h-4 text-pink-300/30" /> : 
              <Sparkles className="w-3 h-3 text-purple-300/30" />
            }
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <FloatingElements />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-md w-full mx-auto p-8"
      >
        {!formspreeState.succeeded ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <motion.div variants={itemVariants} className="text-center space-y-4">
                <div className="flex justify-center">
                  <Crown className="w-12 h-12 bg-gradient-to-r from-primary to-primary/60 bg-clip-text mb-4" />
                </div>
                <h1 className="text-3xl font-serif bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Want a Custom Tool For Your Brand?
                </h1>
                <p className="text-base text-gray-600">
                  Enter your website and email below for a custom preview
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourstore.com"
                          className="w-full bg-white/50 border-pink-200 text-gray-800 placeholder-gray-400 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <ValidationError prefix="Website" field="website" errors={formspreeState.errors} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="hello@yourcompany.com"
                          className="w-full bg-white/50 border-pink-200 text-gray-800 placeholder-gray-400 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <ValidationError prefix="Email" field="email" errors={formspreeState.errors} />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="text-center">
                <Button
                  type="submit"
                  disabled={formspreeState.submitting}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-6 text-lg rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 w-full disabled:opacity-50"
                >
                  {formspreeState.submitting ? 'Submitting...' : 'Get Your Custom Tool ✨'}
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                  Product quizz, multi-step forms, giveaways, and more!
                </p>
              </motion.div>
            </form>
          </Form>
        ) : (
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6 bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-sm"
          >
            <Crown className="w-12 h-12 mx-auto text-pink-500" />
            <h2 className="text-2xl font-serif bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Thank you!
            </h2>
            <p className="text-gray-600">
              I'll get back to you as soon as possible!
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default LeadForm;