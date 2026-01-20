import { HealthSubCategoryList } from '$/components/HealthSubCategoryList/HealthSubCategoryList';
import { LoadingSpinner } from '$/components/LoadingSpinner/LoadingSpinner';
import { useFailedHealthQueries, useHealthCategoriesQuery } from '$/hooks';
import { useIntl } from '$/intl';
import { Navigate, useParamsData } from '$/routing';
import { useStore } from '$/store';
import { Heading, Stack } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';
import { NotFound } from '../NotFound/NotFound';
import { ErrorNoData } from './ErrorNoData';
import { NoData } from './NoData';

import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';
import { AppMessagesIds } from '@minvws/mgo-intl';
import { PdfDownloadLink } from './PdfDownloadLink';
import { HealthQueryErrorNotice } from '$/components/HealthQueryErrorNotice/HealthQueryErrorNotice';

export function HealthCategory() {
    const { organization, healthCategory, organizationSlug } = useParamsData();
    const { formatMessage } = useIntl();
    const allOrganizations = useStore.use.organizations();

    const organizations = organization ? [organization] : allOrganizations;

    const [categoryQuery] = useHealthCategoriesQuery({
        categories: [healthCategory],
        organizations,
    });

    const organizationsFilter = organization ? [organization] : [];
    const categoriesFilter = healthCategory ? [healthCategory] : [];

    const failedQueries = useFailedHealthQueries({
        organizationsFilter,
        categoriesFilter,
    });

    if (!healthCategory) {
        return <NotFound className="flex flex-col items-center text-center" />;
    }

    if (organizationSlug && !organization) {
        return <Navigate to={`/overzicht`} />;
    }

    const { isLoading, isError, isEmpty, category } = categoryQuery;
    const heading = formatMessage(category.heading as AppMessagesIds);

    return (
        <>
            <Helmet title={heading} />

            <section className="grow">
                {!isEmpty && (
                    <HealthQueryErrorNotice
                        organizationsFilter={organizationsFilter}
                        categoriesFilter={categoriesFilter}
                    />
                )}

                <div className="mb-4 flex items-center justify-between md:mb-6">
                    <Breadcrumbs />

                    <PdfDownloadLink
                        categoryHeading={heading}
                        subCategories={category.subcategories}
                    />
                </div>

                <Heading as="h1" focusOnRender size="xl" className="mb-4 md:mb-8">
                    {heading}
                </Heading>

                <div className="pb-4 md:pb-8">
                    {isLoading ? (
                        <div className="py-8 text-center md:py-16">
                            <LoadingSpinner />
                        </div>
                    ) : isError && isEmpty ? (
                        <ErrorNoData onClick={() => failedQueries.retry()} />
                    ) : isEmpty ? (
                        <NoData />
                    ) : (
                        <Stack className="gap-4 md:gap-6">
                            {category.subcategories.map(({ heading, resources }) => (
                                <HealthSubCategoryList
                                    key={`subcategorylist-${heading}`}
                                    heading={heading as AppMessagesIds}
                                    resources={resources}
                                />
                            ))}
                        </Stack>
                    )}
                </div>
            </section>
        </>
    );
}
