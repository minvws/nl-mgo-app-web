import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';
import { FormattedMessage, useIntl } from '$/intl';
import { useParamsData } from '$/routing';
import { Heading } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';
import { NotFound } from './NotFound';
import { HealthCategoryGrid } from '$/components/HealthCategoryGrid/HealthCategoryGrid';

export function Organization() {
    const { organization } = useParamsData();

    const { formatMessage } = useIntl();

    const i18nValues = {
        organizationName: organization?.name,
        organizationCategory: organization?.category,
    };

    if (!organization) {
        return <NotFound />;
    }

    return (
        <>
            <Helmet title={formatMessage('organization.title')} />

            <section className="grow">
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
