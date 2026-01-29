import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { PhaseSection } from '@/components/PhaseSection';
import { useProgress } from '@/hooks/useProgress';
import { dsaSheet } from '@/data/dsaSheet';

const Index = () => {
  const {
    getProblemStatus,
    updateProblemStatus,
    getTopicProgress,
    getPhaseProgress,
    getOverallProgress,
    getDifficultyProgress,
    getRevisionCount,
    getInProgressCount,
  } = useProgress();

  const overallProgress = getOverallProgress();
  const difficultyProgress = getDifficultyProgress();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Dashboard
          overallProgress={overallProgress}
          difficultyProgress={difficultyProgress}
          revisionCount={getRevisionCount()}
          inProgressCount={getInProgressCount()}
        />
        
        <div className="space-y-8">
          {dsaSheet.map((phase) => (
            <PhaseSection
              key={phase.id}
              phase={phase}
              phaseProgress={getPhaseProgress(phase.id)}
              getTopicProgress={getTopicProgress}
              getProblemStatus={getProblemStatus}
              updateProblemStatus={updateProblemStatus}
            />
          ))}
        </div>
      </main>
      
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Built by Syammm 📈 • DSA Practice Tracker • Consistency Beats Motivation • Based on{' '}
            <a 
              href="https://takeuforward.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Striver's A2Z Sheet
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
