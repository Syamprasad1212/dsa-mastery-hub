import { Problem, ProblemStatus } from '@/data/dsaSheet';
import { DifficultyBadge } from './DifficultyBadge';
import { StatusDropdown } from './StatusDropdown';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProblemItemProps {
  problem: Problem;
  index: number;
  status: ProblemStatus;
  onStatusChange: (status: ProblemStatus) => void;
}

export const ProblemItem = ({ problem, index, status, onStatusChange }: ProblemItemProps) => {
  return (
    <div className={cn(
      "problem-row group transition-colors hover:bg-slate-50",
      status === 'solved' && "bg-emerald-50"
    )}>
      <span className="text-sm font-mono text-muted-foreground w-8">
        {String(index).padStart(2, '0')}
      </span>
      
      <StatusDropdown status={status} onStatusChange={onStatusChange} />
      
      <div className="flex-1 min-w-0">
        <span className={cn(
          "text-sm font-medium text-slate-800 transition-colors",
          status === 'solved' && "text-slate-400 line-through"
        )}>
          {problem.title}
        </span>
      </div>
      
      <DifficultyBadge difficulty={problem.difficulty} />
      
      {problem.link && (
        <a
          href={problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );
};
