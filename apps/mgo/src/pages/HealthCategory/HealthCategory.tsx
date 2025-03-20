import { BackButton } from '$/components/BackButton/BackButton';
import { LoadingSpinner } from '$/components/LoadingSpinner/LoadingSpinner';
import { getHealthCategoryBySlug, useHealthCategoryQuery } from '$/healthCategory';
import { useNavFocusRef } from '$/hooks/index.ts';
import { FormattedMessage, useIntl } from '$/intl';
import { Navigate, useParams } from '$/routing';
import { useOrganizationsStore } from '$/store';
import { Alert, Button, Heading, Stack } from '@minvws/mgo-mgo-ui';
import { useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { HealthCategoryContent } from '../../components/HealthCategoryContent/HealthCategoryContent';
import { NoData } from './NoData';

export function HealthCategory() {
    const { formatMessage } = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { healthCategorySlug, organizationSlug } = useParams();
    const { getOrganizationBySlug } = useOrganizationsStore();
    const queryClient = useQueryClient();

    const healthCategory = getHealthCategoryBySlug(healthCategorySlug!);
    const organization = getOrganizationBySlug(organizationSlug);

    const { isLoading, isEmpty, isError, data } = useHealthCategoryQuery(
        healthCategory,
        organizationSlug ? [organization?.id] : undefined
    );

    if (organizationSlug && !organization) {
        return <Navigate to={`/overzicht`} />;
    }

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

                <BackButton />

                <Heading asChild size="lg">
                    <h1 ref={navFocusRef}>{heading}</h1>
                </Heading>

                <div className="py-4 md:py-8">
                    {isLoading && (
                        <div className="py-8 text-center md:py-16">
                            <LoadingSpinner />
                        </div>
                    )}
                    {!isLoading && !isEmpty ? <HealthCategoryContent data={data} /> : <NoData />}
                </div>
            </section>
        </>
    );
}
