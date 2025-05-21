import kebabCase from 'lodash/kebabCase';

export function createUniqueSlug(value: string, existingSlugs: string[]) {
    const slug = kebabCase(value);
    let uniqueSlug = slug;
    let i = 2;
    while (existingSlugs.includes(uniqueSlug)) {
        uniqueSlug = `${slug}-${i}`;
        i++;
    }
    return uniqueSlug;
}
