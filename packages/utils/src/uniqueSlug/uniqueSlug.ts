import { kebabCase } from 'lodash-es';

export function createUniqueSlug(value: string, existingSlugs: string[]) {
    let slug = kebabCase(value);
    if (slug.length === 0) {
        slug = 'undefined';
    }
    let uniqueSlug = slug;
    let i = 2;
    while (existingSlugs.includes(uniqueSlug)) {
        uniqueSlug = `${slug}-${i}`;
        i++;
    }
    return uniqueSlug;
}
