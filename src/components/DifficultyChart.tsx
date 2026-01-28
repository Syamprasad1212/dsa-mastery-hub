import { cn } from '@/lib/utils';

interface DifficultyChartProps {
  easy: { solved: number; total: number };
  medium: { solved: number; total: number };
  hard: { solved: number; total: number };
}

export const DifficultyChart = ({ easy, medium, hard }: DifficultyChartProps) => {
  const data = [
    { label: 'Easy', ...easy, color: 'bg-easy' },
    { label: 'Medium', ...medium, color: 'bg-medium' },
    { label: 'Hard', ...hard, color: 'bg-hard' },
  ];

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="font-semibold text-lg mb-6">Difficulty Breakdown</h3>
      <div className="space-y-5">
        {data.map((item) => {
          const percentage = item.total > 0 ? Math.round((item.solved / item.total) * 100) : 0;
          return (
            <div key={item.label}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm text-muted-foreground">
                  {item.solved}/{item.total}
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", item.color)}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
