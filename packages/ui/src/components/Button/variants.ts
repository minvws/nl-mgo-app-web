export const variants = ['solid', 'light', 'outline', 'ghost', 'destructive'] as const;
export type Variant = (typeof variants)[number];
