export const statuses = ['success', 'warning', 'info', 'error'] as const;
export type Status = (typeof statuses)[number];
