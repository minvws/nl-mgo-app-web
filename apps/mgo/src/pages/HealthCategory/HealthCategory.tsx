import { HealthSubCategoryList } from '$/components/HealthSubCategoryList/HealthSubCategoryList';
import { LoadingSpinner } from '$/components/LoadingSpinner/LoadingSpinner';
import { useHealthCategoryQuery } from '$/healthCategory';
import { SubCategoryData } from '$/healthCategory/useHealthCategoryData/categories';
import { HealthCategoryData } from '$/healthCategory/useHealthCategoryData/useHealthCategoryData';
import { useNavFocusRef } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { Navigate, useParamsData } from '$/routing';
import { Resource } from '$/store';
import { Alert, Button, Heading, Stack } from '@minvws/mgo-ui';
import { useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { NotFound } from '../NotFound/NotFound';
import { NoData } from './NoData';

import { PdfDownloadLink } from './PdfDownloadLink';
import { HealthSubCategory } from './SubCategoryData';
import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';

export function HealthCategory() {
    const { organization, healthCategory, organizationSlug } = useParamsData();
    const { formatMessage } = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const queryClient = useQueryClient();

    const { isLoading, isEmpty, isError, data } = useHealthCategoryQuery(
        healthCategory,
        organization ? [organization?.id] : undefined
    );

    if (!healthCategory) {
        return <NotFound className="flex flex-col items-center text-center" />;
    }

    if (organizationSlug && !organization) {
        return <Navigate to={`/overzicht`} />;
    }

    const sortedSubCategories: HealthSubCategory[] = data
        ? Object.keys(data)
              .map((key) => {
                  const categoryData = data[key as keyof HealthCategoryData] as SubCategoryData;
                  const heading = formatMessage(categoryData.label);
                  return {
                      id: key,
                      heading,
                      resources: categoryData.data as Resource[],
                  };
              })
              .sort((a, b) => a.heading.localeCompare(b.heading))
        : [];

    const heading = formatMessage(`hc_${healthCategory}.heading`);
    return (
        <>
            <Helmet title={heading} />

            <section className="flex-grow">
                {isError && (
                    <Alert
                        label={formatMessage('common.failed_to_load_data')}
                        aria-label={formatMessage('common.failed_to_load_data')}
                        status="warning"
                    >
                        <Stack className="items-start gap-1">
                            <FormattedMessage id="common.error_in_system" />
                            <Button
                                variant="ghost"
                                className="p-0 md:p-0"
                                onClick={() =>
                                    queryClient.invalidateQueries({ queryKey: [healthCategory] })
                                }
                            >
                                <FormattedMessage id="common.try_again" />
                            </Button>
                        </Stack>
                    </Alert>
                )}

                <div className="flex justify-between">
                    <Breadcrumbs />

                    <PdfDownloadLink
                        categoryHeading={heading}
                        subCategories={sortedSubCategories}
                    />
                </div>

                <Heading asChild size="lg">
                    <h1 ref={navFocusRef}>{heading}</h1>
                </Heading>

                <div className="py-4 md:py-8">
                    {isLoading && (
                        <div className="py-8 text-center md:py-16">
                            <LoadingSpinner />
                        </div>
                    )}

                    {!isLoading && !isEmpty ? (
                        <Stack className="gap-4 md:gap-6">
                            {sortedSubCategories.map(({ id, heading, resources }) => (
                                <HealthSubCategoryList
                                    key={`subscategorylist-${id}`}
                                    heading={heading}
                                    resources={resources}
                                />
                            ))}
                        </Stack>
                    ) : (
                        <NoData />
                    )}
                </div>
            </section>
        </>
    );
}
