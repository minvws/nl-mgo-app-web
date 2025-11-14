export const variants = ['info', 'error'] as const;
export type Variant = (typeof variants)[number];
