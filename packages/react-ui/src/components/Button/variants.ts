export const variants = ['solid', 'light', 'outline', 'ghost'] as const;
export type Variant = (typeof variants)[number];
