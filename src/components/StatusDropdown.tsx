import { ProblemStatus } from '@/data/dsaSheet';
import { Check, Circle, Clock, RotateCcw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface StatusDropdownProps {
  status: ProblemStatus;
  onStatusChange: (status: ProblemStatus) => void;
}

const statusConfig: Record<ProblemStatus, { label: string; icon: typeof Check; className: string }> = {
  not_started: { 
    label: 'Not Started', 
    icon: Circle, 
    className: 'text-muted-foreground hover:text-foreground' 
  },
  in_progress: { 
    label: 'In Progress', 
    icon: Clock, 
    className: 'text-info' 
  },
  solved: { 
    label: 'Solved', 
    icon: Check, 
    className: 'text-primary' 
  },
  revision: { 
    label: 'Needs Revision', 
    icon: RotateCcw, 
    className: 'text-warning' 
  },
};

export const StatusDropdown = ({ status, onStatusChange }: StatusDropdownProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn(
          "flex items-center justify-center h-6 w-6 rounded-md transition-all duration-200",
          "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20",
          config.className
        )}>
          <Icon className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        {(Object.keys(statusConfig) as ProblemStatus[]).map((s) => {
          const StatusIcon = statusConfig[s].icon;
          return (
            <DropdownMenuItem
              key={s}
              onClick={() => onStatusChange(s)}
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                status === s && "bg-muted"
              )}
            >
              <StatusIcon className={cn("h-4 w-4", statusConfig[s].className)} />
              <span>{statusConfig[s].label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
