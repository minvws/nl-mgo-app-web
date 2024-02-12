export const sizes = ['sm', 'md', 'lg', 'xl'] as const;
export type Size = (typeof sizes)[number];
