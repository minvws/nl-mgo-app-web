import { BackButton } from '$/components/BackButton/BackButton';
import { getHealthCategoryBySlug } from '$/healthCategory';
import { useNavFocusRef } from '$/hooks';
import { Navigate, useParams } from '$/routing';
import { useResourcesStore } from '$/store';
import { Heading } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { UiSchemaDisplay } from '../../components/UiSchemaDisplay/UiSchemaDisplay';
import { type MessagesIds } from '$/i18n';

export function HealthDataDetail() {
    const intl = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { resourceSlug, organizationSlug, healthCategorySlug } = useParams();
    const getResourceBySlug = useResourcesStore((x) => x.getResourceBySlug);

    const healthCategory = getHealthCategoryBySlug(healthCategorySlug!);
    const resource = getResourceBySlug(resourceSlug);
    const i18nHeading: MessagesIds = `detail_${healthCategory}.heading` as MessagesIds;
    const heading = intl.formatMessage({ id: i18nHeading });

    if (!resource) {
        return <Navigate to={`/overzicht/${organizationSlug}/${healthCategorySlug}`} />;
    }

    return (
        <>
            <Helmet title={heading} />

            <section className="flex-grow">
                <BackButton />

                <Heading asChild size="lg" className="mb-4 md:mb-8">
                    <h1 ref={navFocusRef}>{heading}</h1>
                </Heading>

                <UiSchemaDisplay uiSchema={resource.uiSchema} />
            </section>
        </>
    );
}
