import { useHealthCategoriesQuery } from '$/hooks';
import { useMainHealthCategoriesWithSlugs } from '$/hooks/useMainHealthCategoriesWithSlugs/useMainHealthCategoriesWithSlugs';
import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { HealthcareOrganization } from '$/store';
import { AppMessagesIds } from '@minvws/mgo-intl';
import { Heading, HealthCategoryButton, HealthCategoryIconName } from '@minvws/mgo-ui';

export interface HealthCategoryGridProps {
    readonly organizations: HealthcareOrganization[];
}

export function HealthCategoryGrid({ organizations }: HealthCategoryGridProps) {
    const mainHealthCategories = useMainHealthCategoriesWithSlugs();

    const categoryQueries = useHealthCategoriesQuery({
        categories: mainHealthCategories.flatMap((configs) => configs.categories),
        organizations,
    });

    const { formatMessage } = useIntl();

    return (
        <>
            {mainHealthCategories.map((mainCategory) => {
                return (
                    <div key={mainCategory.id}>
                        <Heading as="h2" size="md" className="mt-9 mb-6 md:mt-14">
                            <FormattedMessage id={mainCategory.heading as AppMessagesIds} />
                        </Heading>

                        <ul
                            className={
                                'grid gap-4 md:[grid-template-columns:repeat(auto-fit,minmax(400px,1fr))]'
                            }
                        >
                            {mainCategory.categories.map((category) => {
                                const query = categoryQueries.find(
                                    ({ category: { id } }) => id === category.id
                                );

                                if (!query) {
                                    throw new Error(`Query not found for category ${category.id}`);
                                }

                                return (
                                    <li className="h-full" key={category.id}>
                                        <HealthCategoryButton
                                            asChild
                                            className="h-full"
                                            title={formatMessage(
                                                category.heading as AppMessagesIds
                                            )}
                                            subtitle={formatMessage(
                                                category.subheading as AppMessagesIds
                                            )}
                                            icon={category.icon as HealthCategoryIconName}
                                            loading={query.isLoading}
                                            statusLabel={
                                                query.isEmpty
                                                    ? formatMessage('common.no_data')
                                                    : undefined
                                            }
                                        >
                                            <RouterLink to={`./${category.slug}`} />
                                        </HealthCategoryButton>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </>
    );
}
