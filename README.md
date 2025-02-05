# Multi-Step Form with Conditional Logic in React

This repository contains a robust multi-step form built with React, Zustand, and React Hook Form. The form incorporates conditional logic, validation, and progress persistence to create a seamless user experience. It was designed to handle complex scenarios, such as a skincare routine builder, where user choices dynamically affect the flow of the form.

## Features

- **Multi-Step Logic**: The form is divided into multiple steps, each with its own validation and conditional logic.
- **Conditional Rendering**: Steps dynamically adapt based on user input, ensuring only relevant questions are displayed.
- **State Management**: Zustand is used to manage form state across steps and sessions, with built-in localStorage persistence.
- **Validation**: Zod is used for schema-based validation, ensuring data integrity at each step.
- **Reusable Components**: Each step is treated as an independent form, making the architecture modular and reusable.
- **Honeypot for Bot Prevention**: Includes a hidden input field to prevent bot submissions.

## Tech Stack

- **React Hook Form**: For form management and validation.
- **Zustand**: For global state management and persistence.
- **Zod**: For schema-based validation.
- **Tailwind CSS**: For styling.
- **Shadcn UI**: For pre-built UI components.
- **Framer Motion**: For animations and transitions.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/multi-step-form.git
   ```   
2. Navigate to the project directory:
   ```bash
   cd multi-step-form
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
## Project Structure
   ```bash
   src/
   ├── components/
   │   ├── steps/                # Individual step components
   │   ├── layout/               # Layout components
   │   └── ui/                   # UI components (e.g., buttons, cards)
   ├── hooks/                    # Custom hooks (e.g., useFormStep)
   ├── lib/                      # Utility functions and store setup
   ├── types/                    # TypeScript types and interfaces
   └── App.tsx                   # Main application component
   ```
## Key Components
### 1. Zustand Store (src/lib/store.ts)
The Zustand store manages the form's global state, including the current step, form data, and persistence logic.

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FormState = {
  currentStep: number;
  formData: SkincareFormData;
  setCurrentStep: (step: number) => void;
  setFormData: (data: SkincareFormData) => void;
  resetForm: () => void;
};

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      formData: {},
      setCurrentStep: (step) => set({ currentStep: step }),
      setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
      resetForm: () => set({ currentStep: 1, formData: {} }),
    }),
    {
      name: 'form-storage', // Key for localStorage
    }
  )
);
```
### 2. Custom Hook (src/hooks/use-form-step.ts)
A reusable hook for managing form state and navigation between steps.

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStore } from '@/lib/store';

export function useFormStep<T extends FieldValues>({ schema, currentStep }: UseFormStepProps<T>) {
  const { setCurrentStep, setFormData } = useFormStore();

  const form = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: useFormStore.getState().formData as DefaultValues<T>,
  });

  const handleNext = (data: T) => {
    setFormData(data);
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return { form, handleNext, handleBack };
}
```

### 3. Step Components (src/components/steps/)
Each step is a standalone component that uses the useFormStep hook. For example, the SelectSkinType step:

```typescript
import { z } from 'zod';
import { useFormStep } from '@/hooks/use-form-step';

const skinTypeSchema = z.object({
  skinType: z.enum(['OILY', 'DRY', 'COMBINATION', 'SENSITIVE']),
});

function SelectSkinType({ step }: { step: number }) {
  const { form, handleNext, handleBack } = useFormStep({
    schema: skinTypeSchema,
    currentStep: step,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Skin Type</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNext)}>
            <FormField
              control={form.control}
              name="skinType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                      {/* Radio options here */}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit">Next</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
```

### 4. Coordinator Component (src/App.tsx)
The coordinator component determines which step to render based on the current step in the Zustand store.

```typescript
import { useFormStore } from './lib/store';
import { SelectSkinType, SelectSkinGoals, FinalStep } from './components/steps';

function App() {
  const currentStep = useFormStore((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SelectSkinType step={1} />;
      case 2:
        return <SelectSkinGoals step={2} />;
      // Add more cases for additional steps
      default:
        return <FinalStep step={currentStep} />;
    }
  };

  return <FormLayout>{renderStep()}</FormLayout>;
}
```

## Demo
Check out the live demo here: [Skincare Routine Builder](https://skincare-routine-builder.vercel.app/)

For a quick overview, watch the YouTube short video demo: [YouTube Short Demo](https://www.youtube.com/shorts/7eZ6Pmp50m8)

## About Me
Hi, I'm Matija Žiberna, a developer passionate about building intuitive and efficient web applications. You can find more about my work and thoughts on my personal blog: [Build With Matija](https://buildwithmatija.com/)

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

Built with ❤️ by Matija Žiberna. Let me know if you have any questions or feedback!

## Notes

Before you start you need to define each step in advance.
This includes the options for each step. 
All conditional logic should be defined in advance.
Meaaning if you dyncamily render more options based on the selected options on the same step
Additionaly if you need to skip a certain step based on the selected options on the previous steps.
You need to define all of this in advance.
That's the secret
