export const variants = ['solid', 'light', 'outline', 'link'] as const;
export type Variant = (typeof variants)[number];
