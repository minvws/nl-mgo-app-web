import { BackButton } from '$/components/BackButton/BackButton';
import { LoadingSpinner } from '$/components/LoadingSpinner/LoadingSpinner';
import { getHealthCategoryBySlug, useHealthCategoryQuery } from '$/healthCategory';
import { useNavFocusRef } from '$/hooks/index.ts';
import { Navigate, useParams } from '$/routing';
import { useOrganizationsStore } from '$/store';
import { Alert, Button, Heading, Stack } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { HealthCategoryContent } from '../../components/HealthCategoryContent/HealthCategoryContent';
import { NoData } from './NoData';

export function HealthCategory() {
    const intl = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { healthCategorySlug, organizationSlug } = useParams();
    const { getOrganizationBySlug } = useOrganizationsStore();

    const healthCategory = getHealthCategoryBySlug(healthCategorySlug!);
    const organization = getOrganizationBySlug(organizationSlug);

    const { isLoading, isEmpty, isError, data } = useHealthCategoryQuery(healthCategory, [
        organization?.id,
    ]);
    const heading = intl.formatMessage({ id: `health_category.${healthCategory}` });

    if (!organization) {
        return <Navigate to={`/overzicht`} />;
    }

    return (
        <>
            <Helmet title={heading} />

            <section className="flex-grow">
                {isError && (
                    <Alert
                        label={intl.formatMessage({ id: 'health_category.error.banner.heading' })}
                        aria-label={intl.formatMessage({
                            id: 'health_category.error.banner.heading',
                        })}
                        status="warning"
                    >
                        <Stack className="items-start gap-1">
                            <FormattedMessage id="health_category.error.banner.subheading" />
                            <Button variant="ghost" className="p-0 md:p-0">
                                <FormattedMessage id="health_category.error.banner.try_again" />
                            </Button>
                        </Stack>
                    </Alert>
                )}

                <BackButton />

                <Heading asChild size="lg">
                    <h1 ref={navFocusRef}>{heading}</h1>
                </Heading>

                <div className="py-4 md:py-8">
                    {isLoading && (
                        <div className="py-8 text-center md:py-16">
                            <LoadingSpinner>
                                <FormattedMessage id="common.loading" />
                            </LoadingSpinner>
                        </div>
                    )}
                    {!isLoading && !isEmpty ? (
                        <HealthCategoryContent category={healthCategory} data={data} />
                    ) : (
                        <NoData />
                    )}
                </div>
            </section>
        </>
    );
}
