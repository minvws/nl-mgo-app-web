import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef, useOrganization } from '$/hooks';
import { CategoryButton, Heading } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { NotFound } from './NotFound';
import { HealthCategoryList } from '$/components/HealthCategoryList/HealthCategoryList';
import { RouterLink } from '$/routing';

export function Organization() {
    const { organization } = useOrganization();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const intl = useIntl();

    const i18nValues = {
        organizationName: organization?.name,
        organizationCategory: organization?.category,
    };

    if (!organization) {
        return <NotFound />;
    }

    return (
        <>
            <Helmet title={intl.formatMessage({ id: 'organization.title' })} />

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

                <CategoryButton icon="folder" asChild>
                    <RouterLink to={`/overzicht/${organization.slug}/documenten`}>
                        <FormattedMessage id="organization.documents_heading" />
                    </RouterLink>
                </CategoryButton>
                <HealthCategoryList organization={organization} />
            </section>
        </>
    );
}
