import { getHealthCategoryConfigs } from '$/config';
import { useIntl } from '$/intl';

import { type HealthCategoryConfig } from '@minvws/mgo-config';
import { AppMessagesIds } from '@minvws/mgo-intl';
import { createUniqueSlug } from '@minvws/mgo-utils';

export type HealthCategoryWithSlug = HealthCategoryConfig & { slug: string };

let cache: HealthCategoryWithSlug[] = [];

export function useHealthCategoriesWithSlug(): HealthCategoryWithSlug[] {
    const { formatMessage } = useIntl();

    if (!cache.length) {
        const categorySlugs: string[] = [];

        const processCategory = (category: HealthCategoryConfig) => {
            const slug = createUniqueSlug(
                formatMessage(category.heading as AppMessagesIds),
                categorySlugs
            );
            categorySlugs.push(slug);

            return {
                ...category,
                slug,
            };
        };

        const categories = getHealthCategoryConfigs();
        cache = categories.map(processCategory);
    }

    return cache;
}
