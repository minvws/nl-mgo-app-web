export const statuses = ['success', 'warning', 'info'] as const;
export type Status = (typeof statuses)[number];
