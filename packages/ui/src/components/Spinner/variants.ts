export const variants = ['default', 'gray', 'sky-blue'] as const;
export type Variant = (typeof variants)[number];
