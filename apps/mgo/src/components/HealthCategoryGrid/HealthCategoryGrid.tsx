import { useHealthCategoriesQuery } from '$/hooks';
import { RouterLink } from '$/routing';
import { HealthcareOrganization } from '$/store';
import { CategoryButtonIcon, Heading, HealthCategoryButton } from '@minvws/mgo-ui';
import { FormattedMessage, useIntl } from '$/intl';
import { AppMessagesIds } from '@minvws/mgo-intl';
import { useMainHealthCategoriesWithSlugs } from '$/hooks/useMainHealthCategoriesWithSlugs/useMainHealthCategoriesWithSlugs';

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
                                    (cat) => cat.category.id === category.id
                                );

                                return (
                                    <li className="h-full" key={`li-${category.id}`}>
                                        <HealthCategoryButton
                                            asChild
                                            title={formatMessage(
                                                category.heading as AppMessagesIds
                                            )}
                                            icon={category.icon as CategoryButtonIcon}
                                            subtitle={formatMessage(
                                                category.subheading as AppMessagesIds
                                            )}
                                            loading={query.isLoading}
                                            statusLabel={
                                                !query.isLoading && query.isEmpty
                                                    ? formatMessage('common.no_data')
                                                    : undefined
                                            }
                                            className="h-full"
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
