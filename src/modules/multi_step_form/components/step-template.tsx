import React from 'react'

interface StepProps {
  onNext: () => void;
  onPrev?: () => void;
}

export const StepComponent: React.FC<StepProps> = ({ 
  onNext, 
  onPrev 
}) => {
  return (
    <div className="w-full">
      {/* Step content */}
      <div className="flex justify-between mt-4">
        {onPrev && (
          <button 
            type="button" 
            onClick={onPrev}
            className="btn btn-secondary"
          >
            Previous
          </button>
        )}
        <button 
          type="button" 
          onClick={onNext}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
}; 