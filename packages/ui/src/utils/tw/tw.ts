/**
 * A template literal tag for Tailwind CSS classes.
 * This ensures the classes are always in the same order using the prettier plugin.
 * @see: https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#sorting-classes-in-template-literals
 */
export const tw = (strings: readonly string[] | ArrayLike<string>, ...values: unknown[]) =>
    String.raw({ raw: strings }, ...values);
