import { useState } from 'react';
import { Topic, ProblemStatus } from '@/data/dsaSheet';
import { ProgressBar } from './ProgressBar';
import { ProblemItem } from './ProblemItem';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  topic: Topic;
  progress: { solved: number; total: number; percentage: number };
  getProblemStatus: (problemId: string) => ProblemStatus;
  updateProblemStatus: (problemId: string, status: ProblemStatus) => void;
}

export const TopicCard = ({ 
  topic, 
  progress, 
  getProblemStatus, 
  updateProblemStatus 
}: TopicCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="topic-card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center gap-4 hover:bg-muted/30 transition-colors"
      >
        <div className={cn(
          "flex items-center justify-center h-8 w-8 rounded-lg transition-colors",
          progress.percentage === 100 ? "bg-primary text-primary-foreground" : "bg-muted"
        )}>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </div>
        
        <div className="flex-1 text-left">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-lg">{topic.name}</h3>
            <span className="text-sm text-muted-foreground">
              {progress.solved}/{progress.total}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{topic.description}</p>
        </div>
        
        <div className="w-32">
          <ProgressBar percentage={progress.percentage} showLabel={false} size="sm" />
        </div>
      </button>
      
      {isExpanded && (
        <div className="border-t border-border/50 animate-fade-up">
          {topic.problems.map((problem, idx) => (
            <ProblemItem
              key={problem.id}
              problem={problem}
              index={idx + 1}
              status={getProblemStatus(problem.id)}
              onStatusChange={(status) => updateProblemStatus(problem.id, status)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
