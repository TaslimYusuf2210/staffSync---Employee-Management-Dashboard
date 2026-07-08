import type { STEPS } from '../schemas/registerSchema';

export function Stepper({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}: {
  steps: typeof STEPS;
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick: (step: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, i) => {
        const isCompleted = completedSteps.has(i) || i < currentStep;
        const isCurrent = i === currentStep;
        const isClickable = i <= currentStep || completedSteps.has(i - 1);
        if (i === steps.length - 1) return null;

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-[#ccd5ae] text-neutral-950 cursor-pointer hover:bg-[#faedcd]'
                    : isCurrent
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isCompleted && i < currentStep ? '✓' : i + 1}
              </button>
              <span
                className={`text-[10px] mt-1 font-medium ${
                  isCurrent ? 'text-indigo-600' : isCompleted ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 2 && (
              <div
                className={`w-8 md:w-12 h-0.5 mx-1 md:mx-2 ${
                  i < currentStep ? 'bg-[#ccd5ae]' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
