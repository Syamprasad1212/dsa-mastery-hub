import { cn } from '@/lib/utils';

interface ProgressBarProps {
  percentage: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar = ({ 
  percentage, 
  className, 
  showLabel = true,
  size = 'md' 
}: ProgressBarProps) => {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-muted-foreground">Progress</span>
          <span className="text-sm font-semibold text-primary">{percentage}%</span>
        </div>
      )}
      <div className={cn(
        "w-full rounded-full overflow-hidden bg-muted",
        sizeClasses[size]
      )}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out progress-gradient",
            percentage === 100 && "bg-primary"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
