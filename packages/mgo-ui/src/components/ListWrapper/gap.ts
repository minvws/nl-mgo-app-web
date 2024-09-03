export const gaps = ['normal', 'line'] as const;
export type Gap = (typeof gaps)[number];
