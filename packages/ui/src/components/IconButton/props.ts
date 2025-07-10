export const sizes = ['sm', 'md'] as const;
export type Size = (typeof sizes)[number];

export const variants = ['solid', 'ghost'] as const;
export type Variant = (typeof variants)[number];
