import { Code2, Github } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary text-primary-foreground">
              <Code2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg">A2Z DSA Tracker</h1>
              <p className="text-xs text-muted-foreground">Striver's Complete Sheet</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-4">
            <a
              href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Original Sheet
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
