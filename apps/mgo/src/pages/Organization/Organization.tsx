import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';
import { FormattedMessage, useIntl } from '$/intl';
import { useParamsData } from '$/routing';
import { ErrorNotice, Heading } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';
import { NotFound } from './NotFound';
import { HealthCategoryGrid } from '$/components/HealthCategoryGrid/HealthCategoryGrid';
import { useFailedHealthQueries, useRetryQuery } from '$/hooks';

export function Organization() {
    const { organization } = useParamsData();

    const { formatMessage } = useIntl();

    const i18nValues = {
        organizationName: organization?.name,
        organizationCategory: organization?.category,
    };

    const failedQueries = useFailedHealthQueries({
        organizations: organization ? [organization] : [],
    });

    const { retry, isRetrying } = useRetryQuery();

    if (!organization) {
        return <NotFound />;
    }

    return (
        <>
            <Helmet title={formatMessage('organization.title')} />

            <section className="grow">
                <ErrorNotice
                    isOpen={failedQueries.length > 0 || isRetrying}
                    heading={formatMessage('common.data_not_retrieved_heading')}
                    subHeading={formatMessage('common.data_not_retrieved_subheading')}
                    buttonLabel={formatMessage('common.try_again')}
                    onClick={() => retry(failedQueries)}
                    loading={isRetrying}
                    loadingTextScreenReader={formatMessage('common.loading_data')}
                />
                <div>
                    <Breadcrumbs />
                </div>

                <Heading as="h1" focusOnRender size="xl" className="mb-4 md:mb-8">
                    <FormattedMessage
                        id="organization.heading"
                        description="{organizationName}"
                        values={i18nValues}
                    />
                </Heading>

                <HealthCategoryGrid organizations={[organization]} />
            </section>
        </>
    );
}
