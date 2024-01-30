export const variants = ['solid', 'light', 'outline'] as const;
export type Variant = (typeof variants)[number];
