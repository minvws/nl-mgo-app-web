export const variants = ['solid', 'outline', 'ghost'] as const;
export type Variant = (typeof variants)[number];
