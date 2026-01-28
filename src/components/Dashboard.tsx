import { StatCard } from './StatCard';
import { ProgressBar } from './ProgressBar';
import { DifficultyChart } from './DifficultyChart';
import { CheckCircle2, Clock, RotateCcw, Target, Trophy, Flame } from 'lucide-react';

interface DashboardProps {
  overallProgress: { solved: number; total: number; percentage: number };
  difficultyProgress: {
    easy: { solved: number; total: number };
    medium: { solved: number; total: number };
    hard: { solved: number; total: number };
  };
  revisionCount: number;
  inProgressCount: number;
}

export const Dashboard = ({
  overallProgress,
  difficultyProgress,
  revisionCount,
  inProgressCount,
}: DashboardProps) => {
  return (
    <div className="mb-12">
      {/* Hero Section */}
      <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">DSA Progress Tracker</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Striver A2Z DSA Sheet • {overallProgress.total} Problems
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-5xl font-bold text-primary">
                  {overallProgress.percentage}%
                </span>
                <span className="text-lg text-muted-foreground">
                  Complete
                </span>
              </div>
              <ProgressBar 
                percentage={overallProgress.percentage} 
                showLabel={false} 
                size="lg" 
              />
              <p className="text-sm text-muted-foreground mt-2">
                {overallProgress.solved} of {overallProgress.total} problems solved
              </p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${overallProgress.percentage * 3.52} 352`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl font-bold">{overallProgress.solved}</span>
                    <span className="text-xs text-muted-foreground block">solved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Problems Solved"
          value={overallProgress.solved}
          subtitle={`out of ${overallProgress.total}`}
          icon={CheckCircle2}
        />
        <StatCard
          title="In Progress"
          value={inProgressCount}
          subtitle="currently working"
          icon={Clock}
          iconClassName="bg-info/10"
        />
        <StatCard
          title="Needs Revision"
          value={revisionCount}
          subtitle="marked for review"
          icon={RotateCcw}
          iconClassName="bg-warning/10"
        />
        <StatCard
          title="Remaining"
          value={overallProgress.total - overallProgress.solved}
          subtitle="to complete"
          icon={Target}
          iconClassName="bg-muted"
        />
      </div>

      {/* Difficulty Chart */}
      <DifficultyChart {...difficultyProgress} />
    </div>
  );
};
