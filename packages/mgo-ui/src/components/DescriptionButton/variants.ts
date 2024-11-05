export const variants = ['default', 'highlighted'] as const;
export type Variant = (typeof variants)[number];
