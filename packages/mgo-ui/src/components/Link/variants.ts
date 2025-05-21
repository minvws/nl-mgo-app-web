export const variants = ['default', 'monochrome'] as const;
export type Variant = (typeof variants)[number];
