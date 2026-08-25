// Programme status vocabulary. 'on-going' is the pre-spine value and maps to
// 'running' until the data migration (backend/apply-spine.js) has run.
export type ProgrammeStatus =
  | 'running'
  | 'completed'
  | 'planned'
  | 'agreed_not_started'
  | 'on-going';

export const statusLabel = (status: ProgrammeStatus): string => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'planned':
      return 'Planned';
    case 'agreed_not_started':
      return 'Agreed, not started';
    default:
      return 'Running';
  }
};

export const statusPillClass = (status: ProgrammeStatus): string =>
  status === 'running' || status === 'on-going'
    ? 'bg-ek-lime text-ek-900'
    : 'bg-ek-sand text-ek-muted';
