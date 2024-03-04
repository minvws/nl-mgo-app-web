export const variants = ['solid', 'link'] as const;
export type Variant = (typeof variants)[number];
