import type { MinerStatus } from '@/types/miner';

export function statusBadgeClass(status: MinerStatus | null): string {
  switch (status) {
    case 'on': return 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500';
    case 'off':
    case 'error': return 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500';
    case 'starting':
    case 'stopping': return 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 animate-pulse';
    default: return 'bg-gray-200 text-gray-800';
  }
};
