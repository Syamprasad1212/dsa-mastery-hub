import { cn } from '@/lib/utils';
import { Difficulty } from '@/data/dsaSheet';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

export const DifficultyBadge = ({ difficulty, className }: DifficultyBadgeProps) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-medium rounded-full border";
  
  const difficultyClasses = {
    Easy: "difficulty-easy",
    Medium: "difficulty-medium", 
    Hard: "difficulty-hard",
  };

  return (
    <span className={cn(baseClasses, difficultyClasses[difficulty], className)}>
      {difficulty}
    </span>
  );
};
