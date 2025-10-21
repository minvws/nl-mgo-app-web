export const variants = ['default', 'dotted', 'monochrome'] as const;
export type Variant = (typeof variants)[number];
