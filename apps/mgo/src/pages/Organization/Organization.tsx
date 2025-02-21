import { BackButton } from '$/components/BackButton/BackButton';
import { HealthCategoryList } from '$/components/HealthCategoryList/HealthCategoryList';
import { useNavFocusRef } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { useParams } from '$/routing';
import { useOrganizationsStore } from '$/store';
import { Heading } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { NotFound } from './NotFound';

export function Organization() {
    const { organizationSlug } = useParams();
    const getOrganizationBySlug = useOrganizationsStore((x) => x.getOrganizationBySlug);
    const organization = getOrganizationBySlug(organizationSlug);
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
                    <BackButton />
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
