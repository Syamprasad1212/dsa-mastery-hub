import { useState, useEffect, useCallback } from 'react';
import { ProblemStatus, dsaSheet, getDifficultyCount, getTotalProblems } from '@/data/dsaSheet';

interface ProgressData {
  [problemId: string]: {
    status: ProblemStatus;
    lastUpdated: string;
  };
}

interface UseProgressReturn {
  progress: ProgressData;
  updateProblemStatus: (problemId: string, status: ProblemStatus) => void;
  getProblemStatus: (problemId: string) => ProblemStatus;
  getSolvedCount: () => number;
  getTopicProgress: (topicId: string) => { solved: number; total: number; percentage: number };
  getPhaseProgress: (phaseId: string) => { solved: number; total: number; percentage: number };
  getOverallProgress: () => { solved: number; total: number; percentage: number };
  getDifficultyProgress: () => { easy: { solved: number; total: number }; medium: { solved: number; total: number }; hard: { solved: number; total: number } };
  getRevisionCount: () => number;
  getInProgressCount: () => number;
}

const STORAGE_KEY = 'dsa-progress-tracker';

export const useProgress = (): UseProgressReturn => {
  const [progress, setProgress] = useState<ProgressData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateProblemStatus = useCallback((problemId: string, status: ProblemStatus) => {
    setProgress(prev => ({
      ...prev,
      [problemId]: {
        status,
        lastUpdated: new Date().toISOString(),
      },
    }));
  }, []);

  const getProblemStatus = useCallback((problemId: string): ProblemStatus => {
    return progress[problemId]?.status || 'not_started';
  }, [progress]);

  const getSolvedCount = useCallback((): number => {
    return Object.values(progress).filter(p => p.status === 'solved').length;
  }, [progress]);

  const getTopicProgress = useCallback((topicId: string): { solved: number; total: number; percentage: number } => {
    const topic = dsaSheet
      .flatMap(phase => phase.topics)
      .find(t => t.id === topicId);
    
    if (!topic) return { solved: 0, total: 0, percentage: 0 };

    const total = topic.problems.length;
    const solved = topic.problems.filter(p => 
      progress[p.id]?.status === 'solved'
    ).length;

    return {
      solved,
      total,
      percentage: total > 0 ? Math.round((solved / total) * 100) : 0,
    };
  }, [progress]);

  const getPhaseProgress = useCallback((phaseId: string): { solved: number; total: number; percentage: number } => {
    const phase = dsaSheet.find(p => p.id === phaseId);
    if (!phase) return { solved: 0, total: 0, percentage: 0 };

    const total = phase.topics.reduce((sum, topic) => sum + topic.problems.length, 0);
    const solved = phase.topics.reduce((sum, topic) => 
      sum + topic.problems.filter(p => progress[p.id]?.status === 'solved').length, 0);

    return {
      solved,
      total,
      percentage: total > 0 ? Math.round((solved / total) * 100) : 0,
    };
  }, [progress]);

  const getOverallProgress = useCallback((): { solved: number; total: number; percentage: number } => {
    const total = getTotalProblems();
    const solved = getSolvedCount();
    return {
      solved,
      total,
      percentage: total > 0 ? Math.round((solved / total) * 100) : 0,
    };
  }, [getSolvedCount]);

  const getDifficultyProgress = useCallback(() => {
    const totals = getDifficultyCount();
    const solvedCounts = { easy: 0, medium: 0, hard: 0 };

    dsaSheet.forEach(phase => {
      phase.topics.forEach(topic => {
        topic.problems.forEach(problem => {
          if (progress[problem.id]?.status === 'solved') {
            if (problem.difficulty === 'Easy') solvedCounts.easy++;
            else if (problem.difficulty === 'Medium') solvedCounts.medium++;
            else solvedCounts.hard++;
          }
        });
      });
    });

    return {
      easy: { solved: solvedCounts.easy, total: totals.easy },
      medium: { solved: solvedCounts.medium, total: totals.medium },
      hard: { solved: solvedCounts.hard, total: totals.hard },
    };
  }, [progress]);

  const getRevisionCount = useCallback((): number => {
    return Object.values(progress).filter(p => p.status === 'revision').length;
  }, [progress]);

  const getInProgressCount = useCallback((): number => {
    return Object.values(progress).filter(p => p.status === 'in_progress').length;
  }, [progress]);

  return {
    progress,
    updateProblemStatus,
    getProblemStatus,
    getSolvedCount,
    getTopicProgress,
    getPhaseProgress,
    getOverallProgress,
    getDifficultyProgress,
    getRevisionCount,
    getInProgressCount,
  };
};
