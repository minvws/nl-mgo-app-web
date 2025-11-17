import { HealthSubCategoryList } from '$/components/HealthSubCategoryList/HealthSubCategoryList';
import { LoadingSpinner } from '$/components/LoadingSpinner/LoadingSpinner';
import { useHealthCategoriesQuery } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { Navigate, useParamsData } from '$/routing';
import { useStore } from '$/store';
import { Alert, Button, Heading, Stack } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';
import { NotFound } from '../NotFound/NotFound';
import { NoData } from './NoData';

import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';
import { AppMessagesIds } from '@minvws/mgo-intl';
import { PdfDownloadLink } from './PdfDownloadLink';

export function HealthCategory() {
    const { organization, healthCategory, organizationSlug } = useParamsData();
    const { formatMessage } = useIntl();
    const allOrganizations = useStore.use.organizations();

    const organizations = organization ? [organization] : allOrganizations;

    const [categoryQuery] = useHealthCategoriesQuery({
        categories: [healthCategory],
        organizations,
    });

    if (!healthCategory) {
        return <NotFound className="flex flex-col items-center text-center" />;
    }

    if (organizationSlug && !organization) {
        return <Navigate to={`/overzicht`} />;
    }

    const { isLoading, isEmpty, isError, category, retry } = categoryQuery;
    const heading = formatMessage(category.heading as AppMessagesIds);

    return (
        <>
            <Helmet title={heading} />

            <section className="grow">
                {isError && (
                    <Alert
                        label={formatMessage('common.failed_to_load_data')}
                        aria-label={formatMessage('common.failed_to_load_data')}
                        status="warning"
                        className="mb-4"
                    >
                        <Stack className="items-start gap-1">
                            <FormattedMessage id="common.error_in_system" />
                            <Button variant="ghost" className="p-0 md:p-0" onClick={() => retry()}>
                                <FormattedMessage id="common.try_again" />
                            </Button>
                        </Stack>
                    </Alert>
                )}

                <div className="flex justify-between">
                    <Breadcrumbs />

                    <PdfDownloadLink
                        categoryHeading={heading}
                        subCategories={category.subcategories}
                    />
                </div>

                <Heading as="h1" focusOnRender size="xl">
                    {heading}
                </Heading>

                <div className="py-4 md:py-8">
                    {isLoading && (
                        <div className="py-8 text-center md:py-16">
                            <LoadingSpinner />
                        </div>
                    )}

                    {!isLoading && !isEmpty && (
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

                    {!isLoading && isEmpty && <NoData />}
                </div>
            </section>
        </>
    );
}
