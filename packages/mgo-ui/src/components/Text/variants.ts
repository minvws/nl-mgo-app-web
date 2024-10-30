export const variants = ['default', 'light'] as const;
export type Variant = (typeof variants)[number];
