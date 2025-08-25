import { HealthCategoryList } from '$/components/HealthCategoryList/HealthCategoryList';
import { useNavFocusRef } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { useParamsData } from '$/routing';
import { Heading } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';
import { NotFound } from './NotFound';
import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';

export function Organization() {
    const { organization } = useParamsData();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
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

            <section className="flex-grow">
                <div>
                    <Breadcrumbs />
                </div>

                <Heading asChild size="lg" className="mb-4 md:mb-8">
                    <h1 ref={navFocusRef}>
                        <FormattedMessage
                            id="organization.heading"
                            description="{organizationName}"
                            values={i18nValues}
                        />
                    </h1>
                </Heading>

                <HealthCategoryList organization={organization} />
            </section>
        </>
    );
}
