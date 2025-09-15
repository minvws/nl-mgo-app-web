export const variants = ['default', 'gray', 'white'] as const;
export type Variant = (typeof variants)[number];
