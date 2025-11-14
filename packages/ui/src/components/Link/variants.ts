export const variants = ['default', 'dotted', 'inverted'] as const;
export type Variant = (typeof variants)[number];
