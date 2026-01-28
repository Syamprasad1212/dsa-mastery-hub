import { Phase, ProblemStatus } from '@/data/dsaSheet';
import { TopicCard } from './TopicCard';
import { ProgressBar } from './ProgressBar';

interface PhaseSectionProps {
  phase: Phase;
  phaseProgress: { solved: number; total: number; percentage: number };
  getTopicProgress: (topicId: string) => { solved: number; total: number; percentage: number };
  getProblemStatus: (problemId: string) => ProblemStatus;
  updateProblemStatus: (problemId: string, status: ProblemStatus) => void;
}

export const PhaseSection = ({
  phase,
  phaseProgress,
  getTopicProgress,
  getProblemStatus,
  updateProblemStatus,
}: PhaseSectionProps) => {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">{phase.name}</h2>
          <span className="text-sm font-medium text-muted-foreground">
            {phaseProgress.solved}/{phaseProgress.total} problems
          </span>
        </div>
        <p className="text-muted-foreground mb-4">{phase.description}</p>
        <ProgressBar percentage={phaseProgress.percentage} size="md" />
      </div>
      
      <div className="space-y-4">
        {phase.topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            progress={getTopicProgress(topic.id)}
            getProblemStatus={getProblemStatus}
            updateProblemStatus={updateProblemStatus}
          />
        ))}
      </div>
    </section>
  );
};
