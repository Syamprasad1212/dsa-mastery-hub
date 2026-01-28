import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  iconClassName?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  className,
  iconClassName 
}: StatCardProps) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl bg-primary/10",
          iconClassName
        )}>
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
};
